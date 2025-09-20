'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (locale: string) => void;
  isChangingLanguage: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

type LanguageProviderProps = {
  children: ReactNode;
  initialLocale?: string;
};

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Try to get from localStorage first, then fall back to initialLocale or default
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferred-language');
      if (stored && routing.locales.includes(stored as typeof routing.locales[number])) {
        return stored;
      }
    }
    return initialLocale || routing.defaultLocale;
  });
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // Set initial language from URL if no stored preference exists
  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const urlLocale = pathSegments[0];
    
    if (urlLocale && routing.locales.includes(urlLocale as typeof routing.locales[number])) {
      // Only set from URL if we don't already have a stored preference
      const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem('preferred-language') : null;
      if (!storedLanguage) {
        setCurrentLanguage(urlLocale);
      }
    }
  }, [pathname]); // Add pathname dependency

  // Save to localStorage whenever language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', currentLanguage);
    }
  }, [currentLanguage]);

  const setLanguage = (newLocale: string) => {
    if (newLocale === currentLanguage) return;
    
    setIsChangingLanguage(true);
    
    // Parse the current pathname to extract the route without locale
    const pathSegments = pathname.split('/').filter(Boolean);
    const hasLocaleInPath = pathSegments[0] && routing.locales.includes(pathSegments[0] as typeof routing.locales[number]);
    
    let routeWithoutLocale = '';
    if (hasLocaleInPath) {
      const remainingSegments = pathSegments.slice(1);
      routeWithoutLocale = remainingSegments.length > 0 ? `/${remainingSegments.join('/')}` : '';
    } else {
      routeWithoutLocale = pathname === '/' ? '' : pathname;
    }
    
    // Construct the new URL with the selected locale
    const newUrl = `/${newLocale}${routeWithoutLocale}`;
    
    // Update state immediately
    setCurrentLanguage(newLocale);
    
    // Navigate to the new URL
    router.push(newUrl);
    
    // Reset loading state after a brief delay
    setTimeout(() => {
      setIsChangingLanguage(false);
    }, 300);
  };

  const value = {
    currentLanguage,
    setLanguage,
    isChangingLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
