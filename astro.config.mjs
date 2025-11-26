// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ibrahimalanshor.github.io',
  vite: {
      plugins: [tailwindcss()],
      server:  {
        allowedHosts: true
      }
  },

  integrations: [icon(), mdx(), sitemap()]
});