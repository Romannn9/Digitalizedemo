import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isWP = mode === 'wp';
  return {
    base: isWP ? '/wp-content/themes/digitalize/dist/' : '/Digitalizedemo/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: isWP ? 'wp-theme/dist' : 'dist',
      manifest: true,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
