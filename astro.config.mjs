import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://GabrielDP97.github.io/repoweb',
  output: 'static',
  integrations: [
    tailwind()
  ]
});