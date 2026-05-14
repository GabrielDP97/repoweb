import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://gabriel-portfolio.github.io',
  output: 'static',
  integrations: [
    tailwind()
  ]
});