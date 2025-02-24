import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, 
    port: 4173,
    allowedHosts: ["bucky-bulletin-54cf84e13b3f.herokuapp.com"]
  },
  server: {
    host: true,
    port: process.env.PORT || 4173
  }
});