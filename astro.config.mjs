// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nvpower.bg',
  integrations: [
    react(),
    // /ai-info/ restates facts that the Organization and Service schema already
    // carry, so it is noindex and stays out of the sitemap rather than
    // competing as thin duplicate content.
    sitemap({ filter: (page) => !page.includes('/404') && !page.includes('/ai-info') }),
  ],

  i18n: {
    defaultLocale: 'bg',
    locales: ['bg', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
