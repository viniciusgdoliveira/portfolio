import { POST, GET } from '@/app/api/chat/route'
import { NextRequest } from 'next/server'

// Mock the rate limiter
jest.mock('@/lib/rateLimiter', () => ({
  rateLimiter: {
    checkRateLimit: jest.fn().mockResolvedValue({
      allowed: true,
      current: 1,
      remaining: 99,
      resetTime: Date.now() + 86400000
    }),
    getRateLimitStatus: jest.fn().mockResolvedValue({
      current: 1,
      remaining: 99,
      resetTime: Date.now() + 86400000
    })
  }
}))

// Mock OpenAI
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            [Symbol.asyncIterator]: async function* () {
              yield {
                choices: [{
                  delta: { content: 'Hello! How can I help you today?' }
                }]
              }
            }
          })
        }
      }
    }))
  }
})

describe('/api/chat', () => {
  beforeEach(() => {
    // Set up environment variables for testing
    process.env.OPENAI_API_KEY = 'sk-test-key'
  })

  afterEach(() => {
    // Clean up
    delete process.env.OPENAI_API_KEY
  })

  describe('POST /api/chat', () => {
  it('validates request body and returns streaming response', async () => {
    const request = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        locale: 'en'
      })
    })

    const response = await POST(request)
    // The test might fail due to validation, let's check the actual response
    if (response.status !== 200) {
      const errorData = await response.json()
      console.log('API Error:', errorData)
    }
    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('text/event-stream')
  })

    it('handles invalid request body', async () => {
      const request = new NextRequest('http://localhost/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: 'invalid'
        })
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('handles missing API key', async () => {
      delete process.env.OPENAI_API_KEY
      
      const request = new NextRequest('http://localhost/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }],
          locale: 'en'
        })
      })

      const response = await POST(request)
      expect(response.status).toBe(500)
    })

  it('handles rate limiting', async () => {
    const rateLimiterModule = require('@/lib/rateLimiter')
    rateLimiterModule.rateLimiter.checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      current: 100,
      remaining: 0,
      resetTime: Date.now() + 86400000
    })

      const request = new NextRequest('http://localhost/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }],
          locale: 'en'
        })
      })

      const response = await POST(request)
      expect(response.status).toBe(429)
    })
  })

  describe('GET /api/chat', () => {
    it('returns API information and rate limits', async () => {
      const request = new NextRequest('http://localhost/api/chat')
      
      const response = await GET(request)
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toHaveProperty('limits')
      expect(data).toHaveProperty('rateLimits')
      expect(data).toHaveProperty('quickResponses')
      expect(data).toHaveProperty('info')
    })
  })
})
