import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pt-BR', 'es', 'fr'],
  defaultLocale: 'en'
});

// Use these for type-safe navigation
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
