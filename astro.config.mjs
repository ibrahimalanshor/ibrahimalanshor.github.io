// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
      server:  {
        allowedHosts: true
      }
  },

  integrations: [icon(), mdx()]
});