import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://gabrieldp97.github.io/repoweb',
  base: '/repoweb',
  output: 'static',
  integrations: [
    tailwind()
  ]
});