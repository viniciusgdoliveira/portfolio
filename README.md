<!-- @format -->

# Portfolio - Vinícius Guimarães de Oliveira

A sophisticated, multilingual portfolio website built with Next.js 15, featuring modern Liquid Glass design aesthetics, AI-powered chat functionality, and comprehensive internationalization support. This project showcases modern web development practices with a focus on performance, accessibility, and user experience.

## ✨ Features

### 🎨 **Design & UI**

- **Liquid Glass Design**: Modern iOS-inspired aesthetic with glassmorphism effects and backdrop blur
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **DOS Style Theme**: Retro terminal-inspired theme option with monospace fonts (toggle hidden in footer)
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Smooth Animations**: Floating elements, hover effects, and smooth transitions
- **Interactive Elements**: Rotating about section, project showcases, and dynamic content

### 🌍 **Internationalization**

- **Multi-language Support**: English, Portuguese (Brazil), Spanish, and French
- **Dynamic Language Switching**: Seamless language changes with URL routing (`/en`, `/pt-BR`, `/es`, `/fr`)
- **Localized Content**: All text content translated and culturally adapted
- **SEO Optimized**: Proper meta tags and structured data for each language
- **Language Context**: React context for language state management

### 🤖 **AI Chat Interface**

- **Intelligent Chatbot**: OpenAI GPT-4o-mini powered assistant representing Vinícius
- **Multilingual Responses**: Chatbot responds in user's preferred language with cultural context
- **Rate Limiting**: Built-in protection against abuse (50 messages/day per IP)
- **Streaming Responses**: Real-time message streaming for better UX
- **Context Awareness**: Maintains conversation context and personality
- **Token Management**: Smart conversation trimming to stay within limits
- **Quick Actions**: Pre-defined conversation starters for common topics

### 📱 **Modern Web Technologies**

- **Next.js 15**: Latest framework with App Router and Turbopack support
- **React 19**: Latest React features and optimizations
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS 4**: Modern utility-first styling with custom components
- **Server-Side Rendering**: Optimized performance and SEO
- **Progressive Web App**: Fast loading and offline capabilities

## 🛠 Tech Stack

### **Frontend**

- **Framework**: Next.js 15 with App Router and Turbopack support
- **React**: React 19 with latest features and optimizations
- **Language**: TypeScript with strict type checking and custom type definitions
- **Styling**: Tailwind CSS 4 with custom Liquid Glass design system
- **Fonts**: Geist Sans & Geist Mono from Google Fonts
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Custom SVG icons and emojis
- **Themes**: Dark/Light mode with DOS-style retro theme option
- **Animations**: CSS transitions, transforms, and floating elements

### **Backend & APIs**

- **API Routes**: Next.js API routes for chat and contact functionality
- **AI Integration**: OpenAI GPT-4o-mini for intelligent responses with streaming
- **Email Service**: Resend for contact form email delivery with HTML templates
- **Rate Limiting**: Custom file-based rate limiting system (50 requests/day per IP)
- **Data Storage**: JSON file-based storage for rate limiting data
- **Validation**: Zod schema validation for API requests
- **Error Handling**: Comprehensive error handling with localized messages
- **Streaming**: Real-time message streaming for chat responses

### **Internationalization**

- **Library**: next-intl for i18n support
- **Languages**: English, Portuguese (Brazil), Spanish, French
- **Routing**: Dynamic locale-based routing with URL structure
- **Content Management**: JSON-based translation files
- **Context Management**: React context for language state

### **Deployment & Infrastructure**

- **Platform**: Vercel (optimized configuration with vercel.json)
- **Domain**: Custom domain with SSL (viniciusgdoliveira.dev)
- **CDN**: Global content delivery with Vercel Edge Network
- **Environment**: Production-ready with environment variables
- **Build Optimization**: Turbopack support for faster development
- **Analytics**: Vercel Analytics and Speed Insights integration
- **Monitoring**: Sentry integration for error tracking
- **Performance**: Optimized bundle with tree shaking and code splitting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn package manager
- OpenAI API key (for chat functionality)
- Resend API key (for contact form functionality)
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/viniciusgdoliveira/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local
```

### Development

```bash
# Run development server
npm run dev

# Run with Turbopack (faster builds)
npm run dev:turbo

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (if available)
npm test

# Run tests in CI mode
npm run test:ci

# Run end-to-end tests
npm run test:e2e
```

### Environment Variables

Create a `.env.local` file with:

```env
# Required for chat functionality
OPENAI_API_KEY=your_openai_api_key_here

# Required for contact form functionality
RESEND_API_KEY=your_resend_api_key_here

# Optional: Site URL for SEO
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── [locale]/                 # Internationalized routes
│   │   │   ├── chat/                 # AI chat interface page
│   │   │   ├── contact/              # Contact form page
│   │   │   ├── projects/             # Projects showcase page
│   │   │   ├── layout.tsx            # Locale-specific layout with providers
│   │   │   └── page.tsx             # Homepage with rotating content
│   │   ├── api/                      # API routes
│   │   │   ├── chat/                 # Chat API endpoint with streaming
│   │   │   ├── contact/              # Contact form API endpoint
│   │   │   └── data/                 # Data API endpoints
│   │   │       ├── projects/          # Projects data endpoint
│   │   │       └── about-sections/   # About sections data endpoint
│   │   ├── globals.css               # Global styles & Liquid Glass effects
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Root redirect page
│   │   ├── robots.ts                 # SEO robots.txt generation
│   │   └── sitemap.ts               # Dynamic sitemap generation
│   ├── components/                   # Reusable React components
│   │   ├── about/                    # About section components
│   │   │   └── AboutCarousel.tsx    # Rotating about sections
│   │   ├── contact/                  # Contact form components
│   │   │   ├── ContactForm.tsx      # Contact form with validation
│   │   │   └── ContactInfo.tsx      # Contact information display
│   │   ├── home/                     # Homepage components
│   │   │   ├── HeroSection.tsx      # Hero section with CTA
│   │   │   ├── AboutMeSection.tsx   # About me with rotating content
│   │   │   ├── FeaturedProjectsSection.tsx # Featured projects display
│   │   │   └── CtaSection.tsx       # Call-to-action section
│   │   ├── projects/                 # Project showcase components
│   │   │   ├── ProjectCard.tsx      # Individual project cards
│   │   │   ├── ProjectGrid.tsx      # Project grid layout
│   │   │   ├── ProjectModal.tsx     # Project detail modal
│   │   │   ├── ProjectSelector.tsx  # Project filtering/selection
│   │   │   └── ProjectShowcase.tsx  # Main project showcase
│   │   ├── seo/                      # SEO components
│   │   │   └── StructuredData.tsx   # JSON-LD structured data
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── Badge.tsx            # Technology badges
│   │   │   ├── Button.tsx           # Custom button component
│   │   │   ├── Card.tsx             # Card component
│   │   │   └── MediaDisplay.tsx     # Media display component
│   │   ├── ChatInterface.tsx         # AI chat interface
│   │   ├── LanguageSwitcher.tsx      # Language selection component
│   │   ├── Navigation.tsx            # Responsive navigation
│   │   ├── ThemeToggle.tsx           # Dark/light mode toggle
│   │   └── Footer.tsx               # Footer component
│   ├── contexts/                     # React contexts
│   │   ├── LanguageContext.tsx       # Language state management
│   │   └── ThemeContext.tsx          # Theme state management
│   ├── data/                         # Static data files
│   │   ├── about-sections.json       # About sections data
│   │   ├── chatbot-personality.json  # AI personality configuration
│   │   ├── contact-info.json         # Contact information
│   │   ├── personal-info.json        # Personal information
│   │   ├── projects.json             # Projects data
│   │   └── seo-data.json             # SEO metadata
│   ├── hooks/                        # Custom React hooks
│   │   └── useChat.ts               # Chat functionality hook
│   ├── i18n/                        # Internationalization
│   │   ├── request.ts               # i18n request configuration
│   │   └── routing.ts               # Locale routing configuration
│   ├── lib/                         # Utility libraries
│   │   ├── data.ts                  # Data service utilities
│   │   ├── rateLimiter.ts           # Rate limiting implementation
│   │   └── utils.ts                 # General utilities
│   ├── services/                     # Service layer
│   │   └── data.service.ts          # Data service for API calls
│   ├── types/                        # TypeScript type definitions
│   │   ├── about.ts                 # About section types
│   │   └── project.ts               # Project types
│   └── messages/                    # Translation files
│       ├── en.json                  # English translations
│       ├── pt-BR.json              # Portuguese (Brazil) translations
│       ├── es.json                 # Spanish translations
│       └── fr.json                 # French translations
├── data/                            # Runtime data storage
│   └── rate-limit.json             # Rate limiting data (auto-generated)
├── public/                          # Static assets
│   ├── flags/                       # Country flag SVGs
│   ├── file.svg                     # Custom icons
│   ├── globe.svg                    # Globe icon
│   ├── next.svg                     # Next.js logo
│   ├── vercel.svg                   # Vercel logo
│   └── window.svg                   # Window icon
├── next.config.ts                   # Next.js configuration
├── next-env.d.ts                    # Next.js TypeScript declarations
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.mjs               # PostCSS configuration
├── eslint.config.mjs                # ESLint configuration
├── vercel.json                      # Vercel deployment configuration
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Dependency lock file
└── README.md                        # Project documentation
```

## 🎯 Key Features Deep Dive

### **AI Chat Interface**

- **Personality-Driven**: Custom AI personality based on Vinícius's professional background
- **Multilingual Support**: Responds in user's language with cultural context
- **Rate Limiting**: 50 messages per day per IP to prevent abuse
- **Streaming Responses**: Real-time message delivery for better UX
- **Context Management**: Maintains conversation history and context
- **Token Management**: Smart conversation trimming to stay within 4000 token limit
- **Error Handling**: Graceful error handling and user feedback
- **Quick Actions**: Pre-defined conversation starters for common topics
- **Rate Limit Headers**: Proper HTTP headers for rate limit information
- **Plain Text Format**: No markdown formatting for clean chat experience
- **Conversation Limits**: Maximum 20 messages per conversation session
- **Personality Traits**: Methodical yet creative, values work-life balance, collaborative approach

### **Liquid Glass Design System**

- **Glassmorphism Effects**: Backdrop blur, transparency, and subtle borders
- **Dynamic Themes**: Automatic dark/light mode with system preference detection
- **DOS Style Theme**: Retro terminal-inspired theme with monospace fonts
- **Smooth Animations**: CSS transitions and transforms for interactive elements
- **Responsive Components**: Mobile-first design with adaptive layouts
- **Custom CSS Variables**: Dynamic theming with CSS custom properties
- **Hover Effects**: Interactive elements with smooth transitions
- **Gradient Backgrounds**: Dynamic gradient backgrounds for different themes

### **Internationalization Architecture**

- **Dynamic Routing**: Locale-based URL routing (`/en`, `/pt-BR`, `/es`, `/fr`)
- **Context Management**: React context for language state persistence
- **SEO Optimization**: Proper meta tags and structured data per language
- **Fallback Handling**: Graceful fallbacks for missing translations
- **Language Detection**: Automatic language detection from URL and preferences

### **Project Showcase**

- **Dynamic Content**: Rotating about sections with different aspects (At Work, Beyond Work, Always Learning)
- **Video Integration**: Project demos with video previews from Shopify CDN
- **Live Links**: Direct links to deployed projects and GitHub repositories
- **Technology Tags**: Visual representation of tech stack used
- **Responsive Grid**: Adaptive grid layout for different screen sizes
- **Project Categories**: Organized by Mobile App, Web Application, E-commerce, AI/Web Application, Automation/Tools
- **Featured Projects**: Highlighted projects with detailed descriptions
- **Interactive Modals**: Detailed project views with media and descriptions
- **Project Filtering**: Filter projects by technology or category
- **Media Display**: Support for videos, images, iframes, and gradient backgrounds

## 🚀 Deployment

### **Vercel Deployment**

This project is optimized for Vercel deployment:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add your OpenAI API key in Vercel dashboard
3. **Automatic Deployment**: Vercel detects Next.js and configures build settings
4. **Custom Domain**: Configure your custom domain in Vercel settings

### **Environment Configuration**

```env
# Required for chat functionality
OPENAI_API_KEY=sk-your-openai-api-key

# Required for contact form functionality
RESEND_API_KEY=re_your-resend-api-key

# Optional: Site URL for SEO
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### **Build Optimization**

- **Static Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting for faster loading
- **Bundle Analysis**: Optimized bundle size with tree shaking

## 🔧 Configuration

### **Rate Limiting**

- **Daily Limit**: 50 messages per day per IP address
- **Storage**: File-based storage in `data/rate-limit.json`
- **Cleanup**: Automatic cleanup of old entries
- **Error Messages**: Localized error messages for rate limit exceeded

### **AI Chat Configuration**

- **Model**: OpenAI GPT-4o-mini for cost efficiency
- **Temperature**: 0.3 for consistent, professional responses
- **Max Tokens**: 500 tokens per response
- **Context Window**: 4000 tokens maximum conversation length
- **Personality**: Custom personality based on professional background
- **Token Warning**: Warning at 3500 tokens to prevent context overflow
- **Conversation Limits**: Maximum 20 messages per conversation
- **Language Detection**: Automatic language detection and response matching
- **Streaming**: Real-time response streaming for better UX
- **Rate Limiting**: 50 messages per day per IP address
- **Error Handling**: Comprehensive error handling with localized messages
- **Quick Actions**: Pre-defined conversation starters for common topics

### **Internationalization**

- **Supported Locales**: `en`, `pt-BR`, `es`, `fr`
- **Default Locale**: English (`en`)
- **Fallback**: Graceful fallback to English for missing translations
- **URL Structure**: `/{locale}/{page}` format
- **Translation Files**: JSON-based translation files in `messages/` directory
- **Dynamic Routing**: Locale-based routing with Next.js App Router
- **Context Management**: React context for language state persistence
- **SEO Optimization**: Proper meta tags and structured data per language

## 📊 Performance Features

- **Server-Side Rendering**: Fast initial page loads with Next.js SSR
- **Static Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting for faster loading
- **Caching**: Intelligent caching strategies for API responses
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Turbopack Support**: Faster development builds with Turbopack
- **CDN Integration**: Global content delivery through Vercel CDN

## 🔒 Security Features

- **Rate Limiting**: Protection against API abuse with IP-based limits
- **Input Validation**: Proper input sanitization and validation
- **Environment Variables**: Secure handling of sensitive data
- **CORS Protection**: Proper CORS configuration
- **Content Security**: XSS protection and secure headers
- **Email Validation**: Server-side email format validation
- **Token Management**: Secure API key handling
- **File-based Storage**: Secure local storage for rate limiting data

## 📈 SEO & Analytics

- **Structured Data**: JSON-LD structured data for search engines
- **Meta Tags**: Comprehensive meta tags for social sharing
- **Sitemap**: Dynamic sitemap generation for all locales
- **Robots.txt**: Proper robots.txt configuration
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Multilingual SEO**: Proper hreflang and locale-specific meta tags
- **Performance Monitoring**: Built-in performance tracking

## 🚀 Featured Projects

This portfolio showcases a diverse range of projects demonstrating expertise across different technologies and domains:

### **Trail Making Test Digital**
- **Type**: Mobile App (React Native, Expo, TypeScript)
- **Category**: Mobile App
- **Description**: Digital neuropsychological assessment tool for iPad and tablets. Features Part A (number sequencing) and Part B (alternating number-letter sequences) to evaluate visual attention and task switching abilities.
- **Key Features**: Touch-based interaction, timer functionality, results analysis, Part A and B testing, cognitive assessment
- **Technologies**: React Native, Expo, TypeScript
- **Challenges**: Implementing precise touch interactions and timing for neuropsychological accuracy
- **GitHub**: [trail-making-test-digital](https://github.com/viniciusgdoliveira/trail-making-test-digital)

### **Aula Firebase Next.js**
- **Type**: Web Application (Next.js, Firebase, Vercel)
- **Category**: Web Application
- **Description**: Learning management system with Firebase integration and real-time features. Features user authentication, Firestore document management, Cloud Storage for image uploads, and real-time data synchronization.
- **Key Features**: User authentication, Firestore document management, Cloud Storage integration, real-time data synchronization, responsive design
- **Technologies**: Next.js, Firebase, Vercel
- **Challenges**: Implementing real-time data sync and managing complex Firebase security rules
- **Live**: [aula-firebase.vercel.app](http://aula-firebase.vercel.app/)
- **GitHub**: [aula-firebase-nextjs](https://github.com/viniciusgdoliveira/aula-firebase-nextjs)

### **Meu Assessor Fashion**
- **Type**: AI/Web Application (Python, Flask, AI/ML)
- **Category**: AI/Web Application
- **Description**: AI-powered fashion consultant with intelligent styling recommendations. This project challenged me to work with AI/ML integration and create a system that understands user preferences to provide personalized fashion advice.
- **Key Features**: AI-powered recommendations, style analysis, user preference learning, fashion trend integration, interactive interface
- **Technologies**: Python, Flask, AI/ML
- **Challenges**: Training AI models for fashion recommendations and handling subjective style preferences
- **Live**: [meuassessorfashion.onrender.com](https://meuassessorfashion.onrender.com)
- **GitHub**: [meuassessorfashion](https://github.com/viniciusgdoliveira/meuassessorfashion)

### **Hydrogen Mush**
- **Type**: E-commerce (Hydrogen, React, TypeScript)
- **Category**: E-commerce
- **Description**: Modern e-commerce platform built with Shopify Hydrogen featuring server-side rendering, lightning-fast performance, and a beautiful modern UI. This project showcases the power of Hydrogen for e-commerce.
- **Key Features**: Server-side rendering, fast performance, modern UI/UX, Shopify integration, responsive design
- **Technologies**: Hydrogen, React, TypeScript
- **Challenges**: Optimizing performance with Hydrogen and creating seamless user experience
- **Live**: [mush.company](https://mush.company)
- **GitHub**: [hydrogen-mush](https://github.com/viniciusgdoliveira/hydrogen-mush)

### **Python Code Automation**
- **Type**: Automation/Tools (Python, Automation, APIs)
- **Category**: Automation/Tools
- **Description**: Powerful automation toolkit for streamlining development workflows. Built to solve repetitive tasks and includes workflow automation, API integrations, and script management capabilities.
- **Key Features**: Workflow automation, API integrations, script management, task scheduling, error handling
- **Technologies**: Python, Automation, APIs
- **Challenges**: Creating flexible automation scripts that work across different environments
- **GitHub**: [python-code-automation](https://github.com/viniciusgdoliveira/python-code-automation)

### **Personal Portfolio Website**
- **Type**: Web Application (Next.js 15, React 19, TypeScript, Tailwind CSS v4)
- **Category**: Web Application
- **Description**: This very portfolio website showcasing modern web development. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Features AI-powered chat interface, multilingual support (EN/ES/FR/PT-BR), dark/light theme, responsive design, and optimized performance.
- **Key Features**: Multilingual support (4 languages), AI-powered chat interface, dark/light theme system, responsive design, SEO optimization, contact form integration, project showcase, performance optimized
- **Technologies**: Next.js 15, React 19, TypeScript, Tailwind CSS v4, next-intl, next-themes, Radix UI, OpenAI, Resend
- **Challenges**: Implementing clean architecture with SOLID principles, managing complex multilingual routing, and optimizing performance across different devices
- **Live**: [viniciusgdoliveira.dev](https://viniciusgdoliveira.dev)
- **GitHub**: [portfolio](https://github.com/viniciusgdoliveira/portfolio)

## 🧪 Development & Testing

### **Development Practices**

- **Type Safety**: Full TypeScript coverage with strict type checking
- **Code Quality**: ESLint configuration with Next.js and TypeScript rules
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **State Management**: React Context for global state (theme, language)
- **Error Handling**: Comprehensive error boundaries and graceful fallbacks
- **Performance**: Optimized bundle size, lazy loading, and code splitting

### **Testing Strategy**

- **Unit Testing**: Jest configuration for component and utility testing
- **Integration Testing**: Testing Library for component integration tests
- **E2E Testing**: Playwright for end-to-end testing
- **Accessibility**: Axe-core integration for accessibility testing
- **Type Checking**: TypeScript compiler checks with `tsc --noEmit`
- **Linting**: ESLint with Next.js and accessibility rules

### **Code Quality Tools**

```bash
# Run all quality checks
npm run lint          # ESLint
npm run type-check    # TypeScript
npm test             # Unit tests
npm run test:ci      # CI tests with coverage
npm run test:e2e     # End-to-end tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Make your changes following the existing code style
5. Run quality checks (`npm run lint && npm run type-check`)
6. Add tests for new functionality
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Vinícius Guimarães de Oliveira**

- **Role**: Software Engineer specializing in Shopify, Hydrogen, TypeScript, ReactJS, Next.js, and Firebase
- **Email**: viniciusgdoliveira@gmail.com
- **LinkedIn**: [linkedin.com/in/viniciusgdoliveira](https://linkedin.com/in/viniciusgdoliveira)
- **GitHub**: [github.com/viniciusgdoliveira](https://github.com/viniciusgdoliveira)
- **Portfolio**: [viniciusgdoliveira.dev](https://viniciusgdoliveira.dev)
- **Location**: Brazil
- **Languages**: Portuguese (Native), English (Fluent), Spanish (Intermediate), French (Basic)

---

_Creating beautiful, functional, and user-centered digital experiences with modern technologies._
