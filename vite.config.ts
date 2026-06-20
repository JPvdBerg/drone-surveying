import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import sitemap from 'vite-plugin-sitemap';
import { VitePWA } from 'vite-plugin-pwa';

// Firebase Hosting serves the site at the domain root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // Emit dist/sitemap.xml on build. hostname is the live Firebase domain.
    // We ship our own public/robots.txt, so don't let the plugin generate one.
    sitemap({
      hostname: 'https://jdhoffman-aerial-solutions.web.app',
      // index.html is auto-detected as '/'; keep the 404 + private dashboard out.
      exclude: ['/404', '/dashboard'],
      generateRobotsTxt: false,
      readable: true,
    }),
    // Installable PWA + offline precache. Registration is called from main.tsx
    // (injectRegister: false) to keep it inside the strict 'self' CSP.
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'JDHoffman Aerial Solutions',
        short_name: 'JDHoffman',
        description:
          'Precision drone surveys, building & tower inspections, and aerial mapping across greater Gauteng.',
        theme_color: '#0a0f14',
        background_color: '#0a0f14',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/pwa-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,woff2}'],
      },
    }),
    // Losslessly/near-losslessly compress raster images at build time. SVGs are
    // excluded from the test so svgo never touches (or warns about) the favicon.
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|avif)$/i,
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
    }),
  ],
  build: {
    target: 'es2018',
    cssMinify: true,
    rollupOptions: {
      // Multi-page: the private dashboard is a separate entry/bundle so it never
      // loads with (or bloats) the public site.
      input: {
        main: 'index.html',
        dashboard: 'dashboard.html',
      },
    },
  },
});
