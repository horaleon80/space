import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5003,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5003,
    strictPort: true,
    cors: true,
  },
});