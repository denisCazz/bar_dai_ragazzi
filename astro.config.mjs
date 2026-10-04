// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const site = 'https://garavella7.bitora.it';
const gestionale =
  process.env.PUBLIC_GESTIONALE_URL || 'http://localhost:3000';

export default defineConfig({
  site,
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en',
        },
      },
      filter: (page) =>
        !page.includes('/404') && !page.endsWith('/og') && !page.includes('/og/'),
      namespaces: { news: false, xhtml: true, image: false, video: false },
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (path === '/' || path === '/en') {
          item.priority = 1;
        } else if (path === '/menu' || path === '/en/menu') {
          item.priority = 0.9;
        } else {
          item.priority = 0.8;
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    server: {
      proxy: {
        '/api/public': {
          target: gestionale.replace(/\/$/, ''),
          changeOrigin: true,
        },
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },
});
