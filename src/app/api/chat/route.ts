import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import chatbotPersonality from '@/data/chatbot-personality.json';
import { rateLimiter } from '@/lib/rateLimiter';
import { safeValidateChatRequest, formatZodError } from '@/lib/validation';

// OpenAI client - using fallback for build time, real key at runtime
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-build-only',
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}


// Function to estimate tokens (rough approximation: 1 token ≈ 4 characters)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// Function to trim conversation to stay within token limits
function trimConversation(messages: ChatMessage[], maxTokens: number): ChatMessage[] {
  const systemMessage = messages.find(m => m.role === 'system');
  const conversationMessages = messages.filter(m => m.role !== 'system');
  
  let totalTokens = systemMessage ? estimateTokens(systemMessage.content) : 0;
  const trimmedMessages: ChatMessage[] = [];
  
  // Add messages from most recent, working backwards
  for (let i = conversationMessages.length - 1; i >= 0; i--) {
    const message = conversationMessages[i];
    const messageTokens = estimateTokens(message.content);
    
    if (totalTokens + messageTokens <= maxTokens) {
      trimmedMessages.unshift(message);
      totalTokens += messageTokens;
    } else {
      break;
    }
  }
  
  // Always include system message first
  if (systemMessage) {
    return [systemMessage, ...trimmedMessages];
  }
  
  return trimmedMessages;
}

// Build dynamic system prompt based on locale and context
function buildSystemPrompt(locale: string = 'en'): string {
  const { systemPrompt } = chatbotPersonality;
  
  // Add locale-specific language instruction first for emphasis
  const localeInstructions = {
    'pt-BR': 'CRÍTICO: Você DEVE responder SEMPRE em português brasileiro. Detecte o idioma do usuário e responda no mesmo idioma. Se o usuário escrever em português, responda em português brasileiro. Se escrever em inglês, espanhol ou francês, responda no idioma correspondente. Use linguagem natural e profissional.',
    'es': 'CRÍTICO: DEBES responder SIEMPRE en español. Detecta el idioma del usuario y responde en el mismo idioma. Si el usuario escribe en español, responde en español. Si escribe en inglés, portugués o francés, responde en el idioma correspondiente. Usa lenguaje natural y profesional.',
    'fr': 'CRITIQUE: Vous DEVEZ répondre TOUJOURS en français. Détectez la langue de l\'utilisateur et répondez dans la même langue. Si l\'utilisateur écrit en français, répondez en français. S\'il écrit en anglais, espagnol ou portugais, répondez dans la langue correspondante. Utilisez un langage naturel et professionnel.',
    'en': 'CRITICAL: You MUST always respond in English. Detect the user\'s language and respond in the same language. If the user writes in English, respond in English. If they write in Portuguese, Spanish, or French, respond in the corresponding language. Use natural and professional language.'
  };
  
  let prompt = localeInstructions[locale as keyof typeof localeInstructions] || localeInstructions.en;
  prompt += '\n\n' + systemPrompt.base + '\n\n';
  
  // Add personality traits
  prompt += 'Your personality traits:\n';
  prompt += systemPrompt.personality.traits.map(trait => `- ${trait}`).join('\n') + '\n\n';
  
  // Add technical expertise
  prompt += 'Your technical expertise:\n';
  prompt += 'Primary: ' + systemPrompt.technical_expertise.primary_skills.join(', ') + '\n';
  prompt += 'Secondary: ' + systemPrompt.technical_expertise.secondary_skills.join(', ') + '\n\n';
  
  // Add project summaries
  prompt += 'Your key projects:\n';
  Object.entries(systemPrompt.projects).forEach(([, project]) => {
    prompt += `- ${project.title}: ${project.description} (${project.tech.join(', ')})\n`;
  });
  prompt += '\n';
  
  // Add conversation rules
  prompt += 'Important conversation rules:\n';
  prompt += systemPrompt.conversation_rules.map(rule => `- ${rule}`).join('\n') + '\n\n';
  
  // Re-emphasize language requirement at the end
  const languageReminder = {
    'pt-BR': 'LEMBRE-SE: Detecte o idioma do usuário e responda SEMPRE no mesmo idioma. Se for português, use português brasileiro natural.',
    'es': 'RECUERDA: Detecta el idioma del usuario y responde SIEMPRE en el mismo idioma. Si es español, usa español natural.',
    'fr': 'RAPPELEZ-VOUS: Détectez la langue de l\'utilisateur et répondez TOUJOURS dans la même langue. Si c\'est le français, utilisez un français naturel.',
    'en': 'REMEMBER: Detect the user\'s language and respond ALWAYS in the same language. If it\'s English, use natural English.'
  };
  
  prompt += languageReminder[locale as keyof typeof languageReminder] || languageReminder.en;
  
  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting first
    const rateLimitResult = await rateLimiter.checkRateLimit(request);
    
    if (!rateLimitResult.allowed) {
      const { rate_limits } = chatbotPersonality;
      const locale = request.nextUrl.searchParams.get('locale') || 'en';
      const errorMessages = rate_limits.error_messages[locale as keyof typeof rate_limits.error_messages] || rate_limits.error_messages.en;
      
      // Format reset time
      const resetTime = new Date(rateLimitResult.resetTime).toLocaleTimeString(locale === 'pt-BR' ? 'pt-BR' : locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      });
      
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: errorMessages.rate_limit_exceeded,
          rateLimit: {
            current: rateLimitResult.current,
            remaining: rateLimitResult.remaining,
            resetTime: rateLimitResult.resetTime,
            resetTimeFormatted: resetTime
          }
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rate_limits.max_requests_per_day.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Check if API key is properly configured at runtime
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith('sk-dummy')) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured',
          message: 'Please configure your OPENAI_API_KEY environment variable.'
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Validate request body using Zod
    const validationResult = safeValidateChatRequest(body);
    if (!validationResult.success) {
      const formattedError = formatZodError(validationResult.error);
      return NextResponse.json(
        { 
          error: formattedError.message, 
          details: formattedError.details 
        }, 
        { status: 400 }
      );
    }

    const { messages, locale = 'en' } = validationResult.data;
    
    // Check conversation length limits
    const { conversation_limits } = chatbotPersonality;
    if (messages.length > conversation_limits.max_conversation_length) {
      return NextResponse.json(
        { 
          error: 'Conversation too long',
          message: 'Please start a new conversation. This helps me provide better responses!'
        },
        { status: 400 }
      );
    }
    
    // Build system prompt
    const systemPrompt = buildSystemPrompt(locale);
    
    // Prepare messages with system prompt
    const allMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];
    
    // Trim conversation if it exceeds token limits
    const trimmedMessages = trimConversation(allMessages, conversation_limits.max_total_tokens);
    
    // Check if we're near token limit and warn
    const totalTokens = trimmedMessages.reduce((sum, msg) => sum + estimateTokens(msg.content), 0);
    const shouldWarn = totalTokens > conversation_limits.token_warning_threshold;
    
    // Call OpenAI API (client already configured with environment variable)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using mini for cost efficiency, upgrade to gpt-4 if needed
      messages: trimmedMessages,
      max_tokens: conversation_limits.max_tokens_per_response,
      temperature: 0.3,
      stream: true,
    });
    
    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              const data = JSON.stringify({ 
                content,
                shouldWarn,
                tokensUsed: totalTokens,
                rateLimit: {
                  remaining: rateLimitResult.remaining,
                  current: rateLimitResult.current,
                  resetTime: rateLimitResult.resetTime
                }
              });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          
          // Send final message
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Rate limiting endpoint info
export async function GET(request: NextRequest) {
  const { conversation_limits, quick_responses, rate_limits } = chatbotPersonality;
  
  // Get current rate limit status for the requesting IP
  const rateLimitStatus = await rateLimiter.getRateLimitStatus(request);
  
  return NextResponse.json({
    limits: conversation_limits,
    rateLimits: {
      maxPerDay: rate_limits.max_requests_per_day,
      current: rateLimitStatus.current,
      remaining: rateLimitStatus.remaining,
      resetTime: rateLimitStatus.resetTime,
      windowMs: rate_limits.window_ms
    },
    quickResponses: quick_responses,
    info: 'Chat API is ready'
  });
}
