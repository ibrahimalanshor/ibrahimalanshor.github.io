// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), icon(), mdx()],
  site: 'https://ibrahimalanshor.github.io',
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'id'
  }
});