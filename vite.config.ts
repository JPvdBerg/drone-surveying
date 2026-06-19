import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project under https://<user>.github.io/drone-surveying/
// so the build must use that sub-path as its base.
export default defineConfig({
  base: '/drone-surveying/',
  plugins: [react()],
  build: {
    target: 'es2018',
    cssMinify: true,
  },
});
