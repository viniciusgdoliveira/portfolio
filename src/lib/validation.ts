/**
 * Runtime validation schemas using Zod
 * Provides type-safe validation for API endpoints and form data
 */

import { z } from 'zod';

// Base schemas for common types
export const EmailSchema = z.string().email('Invalid email format');
export const NonEmptyStringSchema = z.string().min(1, 'This field is required');
export const LocaleSchema = z.enum(['en', 'pt-BR', 'es', 'fr']);

// Contact form validation schema
export const ContactFormSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'First name can only contain letters and spaces'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Last name can only contain letters and spaces'),
  
  email: EmailSchema,
  
  subject: z.string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

// Chat API validation schema
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, 'Message content is required'),
});

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema)
    .min(1, 'At least one message is required')
    .max(50, 'Maximum 50 messages allowed'),
  locale: LocaleSchema.optional().default('en'),
});

// Rate limit configuration schema
export const RateLimitConfigSchema = z.object({
  maxRequestsPerDay: z.number().int().min(1).max(1000),
  windowMs: z.number().int().positive(),
  cleanupInterval: z.number().int().positive(),
});

// Project validation schema (for future use)
export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  shortDescription: z.string().min(1).max(300),
  fullDescription: z.string().min(1).max(2000),
  technologies: z.array(z.string()).min(1),
  category: z.string().min(1),
  status: z.enum(['completed', 'in-progress', 'planned']),
  featured: z.boolean(),
  image: z.object({
    type: z.enum(['video', 'image', 'gradient', 'iframe']),
    url: z.string().url(),
    fallback: z.string().optional(),
    alt: z.string().optional(),
  }),
  links: z.object({
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
  keyFeatures: z.array(z.string()).min(1),
  challenges: z.string().optional(),
  learnings: z.string().optional(),
});

// Utility types derived from schemas
export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type RateLimitConfig = z.infer<typeof RateLimitConfigSchema>;
export type Project = z.infer<typeof ProjectSchema>;

// Validation helper functions
export function validateContactForm(data: unknown): ContactFormData {
  return ContactFormSchema.parse(data);
}

export function validateChatRequest(data: unknown): ChatRequest {
  return ChatRequestSchema.parse(data);
}

export function safeValidateContactForm(data: unknown) {
  return ContactFormSchema.safeParse(data);
}

export function safeValidateChatRequest(data: unknown) {
  return ChatRequestSchema.safeParse(data);
}

// Error formatting utilities
export function formatZodError(error: z.ZodError): {
  message: string;
  details: Record<string, string[]>;
} {
  const details: Record<string, string[]> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!details[path]) {
      details[path] = [];
    }
    details[path].push(err.message);
  });
  
  return {
    message: 'Validation failed',
    details,
  };
}
