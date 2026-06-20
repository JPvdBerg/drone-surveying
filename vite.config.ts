import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import sitemap from 'vite-plugin-sitemap';

// Firebase Hosting serves the site at the domain root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // Emit dist/sitemap.xml on build. hostname is the live Firebase domain.
    // We ship our own public/robots.txt, so don't let the plugin generate one.
    sitemap({
      hostname: 'https://jdhoffman-aerial-solutions.web.app',
      // index.html is auto-detected as '/'; exclude the 404 page from the index.
      exclude: ['/404'],
      generateRobotsTxt: false,
      readable: true,
    }),
    // Losslessly/near-losslessly compress images at build time (no manual step).
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      // svgo defaults, but keep the viewBox so icons scale correctly.
      svg: {
        plugins: [
          { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
        ],
      },
    }),
  ],
  build: {
    target: 'es2018',
    cssMinify: true,
  },
});
