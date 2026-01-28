import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://weather-outfit-index.pages.dev';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/city/search'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
