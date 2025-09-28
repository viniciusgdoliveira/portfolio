import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'development',
  
  // Capture unhandled promise rejections
  integrations: [
    new Sentry.BrowserTracing({
      // Set sampling rate for performance monitoring
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/viniciusgdoliveira\.vercel\.app/,
      ],
    }),
  ],

  // Capture console errors
  beforeSend(event, hint) {
    // Filter out development errors
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry Event:', event)
    }
    return event
  },

  // Set user context
  initialScope: {
    tags: {
      component: 'portfolio',
    },
  },
})
