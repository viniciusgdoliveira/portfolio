'use client';

import { useState, useCallback, useRef } from 'react';
import { useLocale } from 'next-intl';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface RateLimitInfo {
  remaining: number;
  current: number;
  resetTime: number;
}

export interface UseChatReturn {
  messages: ChatMessage[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearConversation: () => void;
  shouldWarn: boolean;
  tokensUsed: number;
  rateLimit: RateLimitInfo | null;
}

// Function to strip markdown and HTML formatting
function stripFormatting(text: string): string {
  if (!text) return text;
  
  // Remove HTML tags
  let cleaned = text.replace(/<[^>]*>/g, '');
  
  // Remove markdown formatting
  cleaned = cleaned
    // Remove bold and italic markdown
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Remove blockquotes
    .replace(/^>\s*/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, '')
    // Remove links but keep the text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  return cleaned;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldWarn, setShouldWarn] = useState(false);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | null>(null);
  const locale = useLocale();
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Create assistant message placeholder
    const assistantMessageId = generateId();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      // Prepare messages for API (exclude IDs and timestamps)
      const apiMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          locale,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle rate limiting specifically
        if (response.status === 429 && errorData.rateLimit) {
          setRateLimit(errorData.rateLimit);
          throw new Error(errorData.message || 'Rate limit exceeded');
        }
        
        throw new Error(errorData.message || errorData.error || 'Failed to send message');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response stream available');
      }

      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                
                // Strip formatting from the content
                const cleanedContent = stripFormatting(accumulatedContent);
                
                // Update the assistant message with streaming content
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: cleanedContent }
                    : msg
                ));
              }

              // Update warning status, token usage, and rate limit info
              if (parsed.shouldWarn !== undefined) {
                setShouldWarn(parsed.shouldWarn);
              }
              if (parsed.tokensUsed !== undefined) {
                setTokensUsed(parsed.tokensUsed);
              }
              if (parsed.rateLimit) {
                setRateLimit(parsed.rateLimit);
              }
            } catch (parseError) {
              console.warn('Failed to parse streaming data:', parseError);
            }
          }
        }
      }

    } catch (err) {
      console.error('Chat error:', err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          // Request was cancelled, remove the assistant message
          setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
          return;
        }
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }

      // Remove the failed assistant message
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading, locale]);

  const clearConversation = useCallback(() => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setMessages([]);
    setError(null);
    setIsLoading(false);
    setShouldWarn(false);
    setTokensUsed(0);
    // Note: We don't clear rateLimit here as it's tied to the user's IP, not the conversation
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearConversation,
    shouldWarn,
    tokensUsed,
    rateLimit,
  };
}
