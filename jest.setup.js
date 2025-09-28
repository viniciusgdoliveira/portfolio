import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Next.js server modules
jest.mock('next/server', () => ({
  NextRequest: class MockNextRequest {
    constructor(url, init = {}) {
      this.url = url
      this.method = init.method || 'GET'
      this.headers = new Map(Object.entries(init.headers || {}))
      this.nextUrl = { searchParams: new URLSearchParams() }
      this.body = init.body
    }
    
    async json() {
      return JSON.parse(this.body || '{}')
    }
  },
  NextResponse: {
    json: (data, init = {}) => ({
      status: init.status || 200,
      headers: new Map(Object.entries(init.headers || {})),
      json: async () => data,
    }),
  },
}))

// Mock file system operations
jest.mock('fs/promises', () => ({
  mkdir: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
}))

// Mock path module
jest.mock('path', () => ({
  join: (...args) => args.join('/'),
  dirname: (path) => path.split('/').slice(0, -1).join('/'),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock TextEncoder
global.TextEncoder = class TextEncoder {
  encode(input) {
    return new Uint8Array(Buffer.from(input, 'utf8'))
  }
}

// Mock ReadableStream
global.ReadableStream = class ReadableStream {
  constructor(underlyingSource) {
    this.underlyingSource = underlyingSource
  }
  
  async start(controller) {
    if (this.underlyingSource.start) {
      await this.underlyingSource.start(controller)
    }
  }
}

// Mock Response
global.Response = class Response {
  constructor(body, init = {}) {
    this.body = body
    this.status = init.status || 200
    this.headers = new Map(Object.entries(init.headers || {}))
  }
  
  get headers() {
    return this._headers
  }
  
  set headers(value) {
    this._headers = value
  }
}