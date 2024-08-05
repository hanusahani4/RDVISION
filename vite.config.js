// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     host: '0.0.0.0',
//     port: 3000,
//   },
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add global to window
      global: resolve(__dirname, 'node_modules/global/')
    }
  },
  define: {
    // Define global
    'global': 'globalThis'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
