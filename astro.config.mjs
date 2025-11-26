import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
// import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['en', 'uk'],
    defaultLocale: 'uk',
    routing: {
      prefixDefaultLocale: false
    }
  },
  image: {
    service: passthroughImageService(),
  },
  output: 'server',
  base: import.meta.env.MODE === 'development' ? '' : 'pumpushka.trade',
  devToolbar: {
    enabled: false
  },
  server: {
    port: 4343
  },
  site: 'https://www.pumpushka.trade',
  compressHTML: false,
  adapter: vercel({
    isr: {
      expiration: 60 * 10, // 10 min
    },
  }),
  integrations: [
    tailwind(),
    // pagefind(),
    sitemap({
      i18n: {
        defaultLocale: 'uk',
        locales: {
          en: 'en-US',
          uk: 'uk-UA',
        },
      },
      changefreq: 'hourly',
      priority: 0.7,
      filter: (page) => {
        if (page.startsWith('/search/')) return false;
        if (page.startsWith('/draft/')) return false;
        if (page.startsWith('/admin/')) return false;
        return true;
      },
    }),
    icon({
      include: {
        tabler: ['*']
      },
      svgoOptions: {
        multipass: true,
        plugins: [
          'removeDimensions',
          'convertShapeToPath',
          'mergePaths',
          'cleanupNumericValues',
        ],
      }
    })
  ]
});
