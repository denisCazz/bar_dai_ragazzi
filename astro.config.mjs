// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const site = 'https://dairagazzi.bitora.it';
const gestionale =
  process.env.PUBLIC_GESTIONALE_URL || 'http://localhost:3000';

export default defineConfig({
  site,
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') && !page.endsWith('/og') && !page.includes('/og/'),
      namespaces: { news: false, xhtml: false, image: false, video: false },
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        if (url === site) {
          item.priority = 1;
        } else if (url.endsWith('/menu')) {
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
