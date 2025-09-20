'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useChat } from '@/hooks/useChat';

interface QuickAction {
  label: string;
  message: string;
}

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const t = useTranslations('chat');
  
  const {
    messages,
    sendMessage,
    isLoading,
    error,
    clearConversation,
    shouldWarn,
    tokensUsed,
    rateLimit,
  } = useChat();

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scroll to show/hide scroll button
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isScrolledUp);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleQuickAction = (message: string) => {
    if (isLoading) return;
    sendMessage(message);
  };

  const quickActions: QuickAction[] = [
    { label: t('quickActions.projects'), message: t('quickActionMessages.projects') },
    { label: t('quickActions.techStack'), message: t('quickActionMessages.techStack') },
    { label: t('quickActions.experience'), message: t('quickActionMessages.experience') },
    { label: t('quickActions.aboutMe'), message: t('quickActionMessages.aboutMe') },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="liquid-card p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t('title')}
            </h1>
            <p className="text-white/80">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Status indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/60 text-sm">{t('status.online')}</span>
            </div>
            
            {/* Token usage */}
            {tokensUsed > 0 && (
              <div className="text-white/60 text-sm">
                {t('status.tokensUsed', { count: tokensUsed })}
              </div>
            )}
            
            {/* Clear button */}
            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="liquid-glass-light text-white/80 hover:text-white px-4 py-2 rounded-[20px] text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                {t('clear')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Warning banner */}
      {shouldWarn && (
        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-[20px] text-yellow-200">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{t('tokenWarning')}</span>
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-[20px] text-red-200">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Chat container */}
      <div className="liquid-card overflow-hidden">
        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="h-[600px] overflow-y-auto p-6 chat-scrollbar"
        >
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 liquid-glass mx-auto mb-4 flex items-center justify-center rounded-full">
                <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                {t('greeting')}
              </p>
              
              {/* Quick actions */}
              <div className="space-y-3">
                <p className="text-white/60 text-sm">{t('quickActions.title')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.message)}
                      disabled={isLoading}
                      className="liquid-glass-light text-white/80 hover:text-white p-3 rounded-[20px] text-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-6 message-enter`}
            >
              <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-3 max-w-[85%]`}>
                {/* Avatar for assistant messages */}
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 chat-avatar chat-avatar-assistant rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">V</span>
                    </div>
                  </div>
                )}
                
                {/* Message bubble */}
                <div
                  className={`chat-bubble relative px-6 py-4 rounded-[24px] ${
                    message.role === 'user'
                      ? 'chat-bubble-user text-white ml-12'
                      : 'chat-bubble-assistant text-white/95'
                  }`}
                >
                  {/* Message content */}
                  <div className="chat-message-text whitespace-pre-wrap break-words">
                    {message.content || (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    )}
                  </div>
                  
                  {/* Timestamp */}
                  <div className={`chat-timestamp mt-3 flex items-center space-x-2 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-white/50'
                  }`}>
                    <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {message.role === 'assistant' && (
                      <>
                        <span>•</span>
                        <span>Vinícius</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Avatar for user messages */}
                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 chat-avatar chat-avatar-user rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">U</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <div className="absolute right-8 bottom-24">
            <button
              onClick={scrollToBottom}
              className="w-10 h-10 liquid-glass-light text-white/80 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}

        {/* Input form */}
        <div className="border-t border-white/10 p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={rateLimit && rateLimit.remaining <= 0 ? t('rateLimit.dailyLimitReached') : t('placeholder')}
                disabled={isLoading || (rateLimit?.remaining ?? 1) <= 0}
                className="w-full liquid-glass-light text-white placeholder-white/60 p-4 rounded-[20px] resize-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:opacity-50 min-h-[56px] max-h-[120px]"
                rows={1}
              />
              
              {/* Character counter */}
              <div className="absolute bottom-2 right-2 text-xs text-white/40">
                {input.length}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!input.trim() || isLoading || (rateLimit?.remaining ?? 1) <= 0}
              className="liquid-button text-white font-semibold px-6 py-4 rounded-[20px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[80px] flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>
          
          {/* Rate limit information */}
          {rateLimit && (
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-white/60">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>
                  {rateLimit.remaining > 0 
                    ? t('rateLimit.remaining', { remaining: rateLimit.remaining })
                    : t('rateLimit.limitReached')
                  }
                </span>
              </div>
              {rateLimit.remaining <= 5 && rateLimit.remaining > 0 && (
                <div className="text-yellow-400 text-xs">
                  {t('rateLimit.approachingLimit')}
                </div>
              )}
            </div>
          )}
          
          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center space-x-3 mt-2 mb-6 message-enter">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 chat-avatar chat-avatar-assistant rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
              </div>
              <div className="chat-bubble chat-bubble-assistant px-6 py-4 rounded-[24px]">
                <div className="flex items-center space-x-2 text-white/80 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span>{t('status.typing')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
