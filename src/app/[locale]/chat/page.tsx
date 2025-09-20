import { setRequestLocale } from 'next-intl/server';
import ChatInterface from '@/components/ChatInterface';

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Generate metadata for the chat page
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  
  return {
    title: `Chat with Vinícius - ${locale === 'pt-BR' ? 'Conversar com Vinícius' : 'Chat with Vinícius'}`,
    description: locale === 'pt-BR' 
      ? 'Converse comigo sobre meus projetos, stack tecnológico e experiências em desenvolvimento de software.'
      : 'Chat with me about my projects, tech stack, and software development experiences.',
  };
}

export default async function ChatPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen liquid-bg">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Chat with Vinícius Guimarães de Oliveira",
            "description": "Interactive chat to learn about Vinícius's projects, tech stack, and software development experiences",
            "url": `https://viniciusgdoliveira.vercel.app/${locale}/chat`,
            "author": {
              "@type": "Person",
              "name": "Vinícius Guimarães de Oliveira",
              "jobTitle": "Software Engineer",
              "sameAs": [
                "https://github.com/viniciusgdoliveira",
                "https://linkedin.com/in/viniciusgdoliveira"
              ]
            },
            "potentialAction": {
              "@type": "CommunicateAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `https://viniciusgdoliveira.vercel.app/${locale}/chat`
              }
            }
          })
        }}
      />

      <section className="container mx-auto px-4 py-10">
        <ChatInterface />
      </section>
    </div>
  );
}
