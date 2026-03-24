import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Static build for Cloudflare Pages
// All pages are pre-rendered at build time — zero server-side JS overhead
export default defineConfig({
  site: 'https://meteorite.jewelry',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  // All product images live on Shopify CDN — no local image processing needed
  image: {
    service: passthroughImageService(),
  },
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
    server: {
      allowedHosts: ['116379d0345c.ngrok.app'],
    },
  },
});
