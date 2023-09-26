import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import compressor from 'astro-compressor';
import markdoc from '@astrojs/markdoc';
import robotsTxt from 'astro-robots-txt';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration';
import icon from 'astro-icon';

import compress from 'astro-compress';

const defaultLocale = 'uk';
const locales = {
  uk: 'uk-UA',
  en: 'en-US',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://skloresurs.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  output: 'server',
  integrations: [
    icon({
      iconDir: 'src/icons',
      include: {
        mdi: ['*'],
      },
    }),
    i18n({
      locales,
      defaultLocale,
    }),
    tailwind(),
    react(),
    markdoc(),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
        },
      ],
    }),
    compress(),
    compressor({
      gzip: true,
      brotli: true,
    }),
  ],
  adapter: node({
    mode: 'standalone',
  }),
});
