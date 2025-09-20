import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface RateLimitEntry {
  ip: string;
  date: string;
  count: number;
  firstRequest: number;
  lastRequest: number;
}

interface RateLimitConfig {
  maxRequestsPerDay: number;
  windowMs: number; // 24 hours in milliseconds
  cleanupInterval: number; // Clean old entries every hour
}

class RateLimiter {
  private config: RateLimitConfig;
  private dataFile: string;
  private entries: Map<string, RateLimitEntry> = new Map();

  constructor(config: RateLimitConfig) {
    this.config = config;
    this.dataFile = path.join(process.cwd(), 'data', 'rate-limit.json');
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.dataFile), { recursive: true });
      const data = await fs.readFile(this.dataFile, 'utf-8');
      const parsed = JSON.parse(data);
      this.entries = new Map(Object.entries(parsed));
    } catch {
      // File doesn't exist or is invalid, start with empty map
      this.entries = new Map();
    }
  }

  private async saveData(): Promise<void> {
    try {
      const data = Object.fromEntries(this.entries);
      await fs.writeFile(this.dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Failed to save rate limit data:', error);
    }
  }

  private getClientIP(request: NextRequest): string {
    // Check for various headers that might contain the real IP
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    
    if (cfConnectingIP) return cfConnectingIP;
    if (realIP) return realIP;
    if (forwarded) return forwarded.split(',')[0].trim();
    
    // Fallback to unknown if no IP headers are found
    return 'unknown';
  }

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  private cleanupOldEntries(): void {
    const cutoff = Date.now() - this.config.windowMs;
    for (const [key, entry] of this.entries.entries()) {
      if (entry.lastRequest < cutoff) {
        this.entries.delete(key);
      }
    }
  }

  public async checkRateLimit(request: NextRequest): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    current: number;
  }> {
    const ip = this.getClientIP(request);
    const today = this.getTodayString();
    const key = `${ip}-${today}`;
    const now = Date.now();

    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance to cleanup on each request
      this.cleanupOldEntries();
    }

    let entry = this.entries.get(key);

    if (!entry) {
      // First request of the day for this IP
      entry = {
        ip,
        date: today,
        count: 1,
        firstRequest: now,
        lastRequest: now,
      };
      this.entries.set(key, entry);
      await this.saveData();

      return {
        allowed: true,
        remaining: this.config.maxRequestsPerDay - 1,
        resetTime: now + this.config.windowMs,
        current: 1,
      };
    }

    // Check if we're within the same day
    if (entry.date !== today) {
      // New day, reset the counter
      entry.count = 1;
      entry.date = today;
      entry.firstRequest = now;
      entry.lastRequest = now;
      this.entries.set(key, entry);
      await this.saveData();

      return {
        allowed: true,
        remaining: this.config.maxRequestsPerDay - 1,
        resetTime: now + this.config.windowMs,
        current: 1,
      };
    }

    // Same day, check if limit exceeded
    if (entry.count >= this.config.maxRequestsPerDay) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.firstRequest + this.config.windowMs,
        current: entry.count,
      };
    }

    // Increment counter
    entry.count++;
    entry.lastRequest = now;
    this.entries.set(key, entry);
    await this.saveData();

    return {
      allowed: true,
      remaining: this.config.maxRequestsPerDay - entry.count,
      resetTime: entry.firstRequest + this.config.windowMs,
      current: entry.count,
    };
  }

  public async getRateLimitStatus(request: NextRequest): Promise<{
    current: number;
    remaining: number;
    resetTime: number;
    limit: number;
  }> {
    const ip = this.getClientIP(request);
    const today = this.getTodayString();
    const key = `${ip}-${today}`;
    const now = Date.now();

    const entry = this.entries.get(key);

    if (!entry || entry.date !== today) {
      return {
        current: 0,
        remaining: this.config.maxRequestsPerDay,
        resetTime: now + this.config.windowMs,
        limit: this.config.maxRequestsPerDay,
      };
    }

    return {
      current: entry.count,
      remaining: Math.max(0, this.config.maxRequestsPerDay - entry.count),
      resetTime: entry.firstRequest + this.config.windowMs,
      limit: this.config.maxRequestsPerDay,
    };
  }
}

// Default configuration
const defaultConfig: RateLimitConfig = {
  maxRequestsPerDay: 50, // Allow 50 requests per day per IP
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  cleanupInterval: 60 * 60 * 1000, // 1 hour
};

// Export singleton instance
export const rateLimiter = new RateLimiter(defaultConfig);

// Export the class for testing or custom configurations
export { RateLimiter, type RateLimitConfig, type RateLimitEntry };
