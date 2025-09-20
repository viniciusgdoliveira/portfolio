<!-- @format -->

# Portfolio - Vinícius Guimarães de Oliveira

A sophisticated, multilingual portfolio website built with Next.js 15, featuring modern Liquid Glass design aesthetics, AI-powered chat functionality, and comprehensive internationalization support.

## ✨ Features

### 🎨 **Design & UI**

- **Liquid Glass Design**: Modern iOS-inspired aesthetic with glassmorphism effects
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Smooth Animations**: Floating elements, hover effects, and smooth transitions
- **Interactive Elements**: Rotating about section, project showcases, and dynamic content

### 🌍 **Internationalization**

- **Multi-language Support**: English, Portuguese (Brazil), Spanish, and French
- **Dynamic Language Switching**: Seamless language changes with URL routing
- **Localized Content**: All text content translated and culturally adapted
- **SEO Optimized**: Proper meta tags and structured data for each language

### 🤖 **AI Chat Interface**

- **Intelligent Chatbot**: OpenAI-powered assistant representing Vinícius
- **Multilingual Responses**: Chatbot responds in user's preferred language
- **Rate Limiting**: Built-in protection against abuse (50 messages/day)
- **Streaming Responses**: Real-time message streaming for better UX
- **Context Awareness**: Maintains conversation context and personality

### 📱 **Modern Web Technologies**

- **Next.js 15**: Latest framework with App Router and Turbopack support
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS 4**: Modern utility-first styling with custom components
- **Server-Side Rendering**: Optimized performance and SEO
- **Progressive Web App**: Fast loading and offline capabilities

## 🛠 Tech Stack

### **Frontend**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom Liquid Glass components
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Custom SVG icons and emojis

### **Backend & APIs**

- **API Routes**: Next.js API routes for chat functionality
- **AI Integration**: OpenAI GPT-4o-mini for intelligent responses
- **Rate Limiting**: Custom file-based rate limiting system
- **Data Storage**: JSON file-based storage for rate limiting data

### **Internationalization**

- **Library**: next-intl for i18n support
- **Languages**: English, Portuguese (Brazil), Spanish, French
- **Routing**: Dynamic locale-based routing
- **Content Management**: JSON-based translation files

### **Deployment & Infrastructure**

- **Platform**: Vercel (optimized configuration)
- **Domain**: Custom domain with SSL
- **CDN**: Global content delivery
- **Environment**: Production-ready with environment variables

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key (for chat functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/viniciusgdoliveira/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenAI API key to .env.local
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
```

### Environment Variables

Create a `.env.local` file with:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── chat/                 # AI chat interface
│   │   ├── contact/              # Contact form page
│   │   ├── projects/             # Projects showcase
│   │   ├── layout.tsx            # Locale-specific layout
│   │   └── page.tsx             # Homepage with rotating content
│   ├── api/
│   │   └── chat/                 # Chat API endpoint
│   ├── globals.css               # Global styles & Liquid Glass effects
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Root redirect page
│   ├── robots.ts                 # SEO robots.txt
│   └── sitemap.ts               # Dynamic sitemap generation
├── components/                   # Reusable components
│   ├── ChatInterface.tsx         # AI chat interface
│   ├── LanguageSwitcher.tsx      # Language selection component
│   ├── Navigation.tsx            # Responsive navigation
│   └── ThemeToggle.tsx           # Dark/light mode toggle
├── contexts/                     # React contexts
│   ├── LanguageContext.tsx       # Language state management
│   └── ThemeContext.tsx          # Theme state management
├── data/                         # Static data files
│   └── chatbot-personality.json  # AI personality configuration
├── hooks/                        # Custom React hooks
│   └── useChat.ts               # Chat functionality hook
├── i18n/                        # Internationalization
│   ├── request.ts               # i18n request configuration
│   └── routing.ts               # Locale routing configuration
├── lib/                         # Utility libraries
│   └── rateLimiter.ts           # Rate limiting implementation
└── messages/                    # Translation files
    ├── en.json                  # English translations
    ├── pt-BR.json              # Portuguese (Brazil) translations
    ├── es.json                 # Spanish translations
    └── fr.json                 # French translations
```

## 🎯 Key Features Deep Dive

### **AI Chat Interface**

- **Personality-Driven**: Custom AI personality based on Vinícius's professional background
- **Multilingual Support**: Responds in user's language with cultural context
- **Rate Limiting**: 50 messages per day per IP to prevent abuse
- **Streaming Responses**: Real-time message delivery for better UX
- **Context Management**: Maintains conversation history and context
- **Error Handling**: Graceful error handling and user feedback

### **Liquid Glass Design System**

- **Glassmorphism Effects**: Backdrop blur, transparency, and subtle borders
- **Dynamic Themes**: Automatic dark/light mode with system preference detection
- **Smooth Animations**: CSS transitions and transforms for interactive elements
- **Responsive Components**: Mobile-first design with adaptive layouts
- **Custom CSS Variables**: Dynamic theming with CSS custom properties

### **Internationalization Architecture**

- **Dynamic Routing**: Locale-based URL routing (`/en`, `/pt-BR`, `/es`, `/fr`)
- **Context Management**: React context for language state persistence
- **SEO Optimization**: Proper meta tags and structured data per language
- **Fallback Handling**: Graceful fallbacks for missing translations
- **Language Detection**: Automatic language detection from URL and preferences

### **Project Showcase**

- **Dynamic Content**: Rotating about sections with different aspects
- **Video Integration**: Project demos with video previews
- **Live Links**: Direct links to deployed projects and GitHub repositories
- **Technology Tags**: Visual representation of tech stack used
- **Responsive Grid**: Adaptive grid layout for different screen sizes

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

### **Internationalization**

- **Supported Locales**: `en`, `pt-BR`, `es`, `fr`
- **Default Locale**: English (`en`)
- **Fallback**: Graceful fallback to English for missing translations
- **URL Structure**: `/{locale}/{page}` format

## 📊 Performance Features

- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic code splitting for faster loading
- **Caching**: Intelligent caching strategies for API responses
- **Bundle Optimization**: Tree shaking and dead code elimination

## 🔒 Security Features

- **Rate Limiting**: Protection against API abuse
- **Input Validation**: Proper input sanitization and validation
- **Environment Variables**: Secure handling of sensitive data
- **CORS Protection**: Proper CORS configuration
- **Content Security**: XSS protection and secure headers

## 📈 SEO & Analytics

- **Structured Data**: JSON-LD structured data for search engines
- **Meta Tags**: Comprehensive meta tags for social sharing
- **Sitemap**: Dynamic sitemap generation
- **Robots.txt**: Proper robots.txt configuration
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter-specific meta tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Vinícius Guimarães de Oliveira**

- **Role**: Software Engineer specializing in Shopify, Hydrogen, TypeScript, ReactJS, Next.js, and Firebase
- **Email**: viniciusgdoliveira@gmail.com
- **LinkedIn**: [linkedin.com/in/viniciusgdoliveira](https://linkedin.com/in/viniciusgdoliveira)
- **GitHub**: [github.com/viniciusgdoliveira](https://github.com/viniciusgdoliveira)
- **Portfolio**: [viniciusgdoliveira.vercel.app](https://viniciusgdoliveira.vercel.app)

---

_Creating beautiful, functional, and user-centered digital experiences with modern technologies._
