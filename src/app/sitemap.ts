import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://viniciusgdoliveira.vercel.app';
  
  const routes = [
    '',
    '/projects',
    '/contact',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each locale
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: routing.locales.reduce((acc, loc) => {
            acc[loc] = `${baseUrl}/${loc}${route}`;
            return acc;
          }, {} as Record<string, string>)
        }
      });
    });
  });

  return sitemap;
}
