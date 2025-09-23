import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import enMessages from '../../../messages/en.json';
import ptBRMessages from '../../../messages/pt-BR.json';
import esMessages from '../../../messages/es.json';
import frMessages from '../../../messages/fr.json';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Load messages based on locale
  let messages;
  switch (locale) {
    case 'en':
      messages = enMessages;
      break;
    case 'pt-BR':
      messages = ptBRMessages;
      break;
    case 'es':
      messages = esMessages;
      break;
    case 'fr':
      messages = frMessages;
      break;
    default:
      messages = enMessages; // fallback to English
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <LanguageProvider initialLocale={locale}>
        <div className="min-h-screen flex flex-col">
          {/* Header Box */}
          <header className="flex-shrink-0">
            <Navigation />
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          
          {/* Footer Box */}
          <footer className="flex-shrink-0">
            <Footer />
          </footer>
        </div>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
