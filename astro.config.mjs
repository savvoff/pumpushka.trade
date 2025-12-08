import { defineConfig, sharpImageService } from 'astro/config';
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
    service: sharpImageService(),
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
      expiration: 60 * 60, // 60 min
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
        // ❌ We exclude service pages
        if (page.includes('/search')) return false;
        if (page.includes('/draft')) return false;
        if (page.includes('/admin')) return false;
        if (page.includes('/404')) return false;

        // ❌ We exclude indexing of tags and categories
        if (page.includes('/tags')) return false;
        if (page.includes('/tag/')) return false;
        if (page.includes('/categories')) return false;
        if (page.includes('/category')) return false;

        // ❌ We exclude pagination
        if (/\/page\/\d+\/?$/.test(page)) return false;

        // ❌ Turn off RSS/feeds
        if (page.includes('/rss')) return false;
        if (page.includes('/feed')) return false;
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
