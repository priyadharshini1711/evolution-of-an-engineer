import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is a single page with hash anchors, so relative asset paths work
// at any URL: a GitHub Pages project site (/<repo>/), a user site (/) or
// locally. Set VITE_BASE to force an absolute base path if you need one.
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react()],
  // Only `public/` is copied into the build. The source resumes live in
  // "Resume Collections/", which is outside both `src/` and `public/`.
  publicDir: 'public',
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
