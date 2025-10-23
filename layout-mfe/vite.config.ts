import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'layout_app',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/Header.tsx',
        './Footer': './src/components/Footer.tsx',
      },
      shared: {
        react: { 
          singleton: true,
          strictVersion: true,
          requiredVersion: '^18.2.0'
        },
        'react-dom': { 
          singleton: true,
          strictVersion: true,
          requiredVersion: '^18.2.0'
        },
        'react-redux': { 
          singleton: true,
          requiredVersion: '^9.1.0'
        },
        '@reduxjs/toolkit': { 
          singleton: true,
          requiredVersion: '^2.0.1'
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.20.0'
        },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
});