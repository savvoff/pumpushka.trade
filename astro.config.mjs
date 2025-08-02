// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  base: import.meta.env.MODE === 'development' ? '' : 'pumpushka.trade',
  devToolbar: {
    enabled: false
  },
  server: {
    port: 4343
  },
  site: 'https://www.pumpushka.trade',
  compressHTML: false,
  integrations: [
    tailwind(),
    icon({
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
