import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = ({ site: siteUrl }) => {
  const sitemap = new URL('sitemap-index.xml', siteUrl ?? site.url);
  const body = `User-agent: *
Allow: /
Disallow: /og

Host: ${new URL(site.url).host}

Sitemap: ${sitemap.href}
`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
