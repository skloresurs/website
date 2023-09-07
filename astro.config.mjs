import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import astroI18next from 'astro-i18next';
import compressor from 'astro-compressor';
import markdoc from '@astrojs/markdoc';
import robotsTxt from 'astro-robots-txt';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: 'https://skloresurs.com',
  output: 'server',
  integrations: [astroI18next(), tailwind(), react(), markdoc(), sitemap({
    i18n: {
      defaultLocale: 'uk',
      locales: {
        uk: 'uk-UA',
        en: 'en-US'
      }
    }
  }), robotsTxt({
    policy: [
      {
        userAgent: '*',
      }
    ],
    sitemapBaseFileName: 'sitemap-index'
  }), compress(), compressor({
    gzip: true,
    brotli: true
  })],
  adapter: node({
    mode: 'standalone'
  })
});