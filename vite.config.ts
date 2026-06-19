import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// GitHub Pages serves this project under https://<user>.github.io/drone-surveying/
// so the build must use that sub-path as its base.
export default defineConfig({
  base: '/drone-surveying/',
  plugins: [
    react(),
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
