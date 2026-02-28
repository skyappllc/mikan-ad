import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mikan.ad',
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
