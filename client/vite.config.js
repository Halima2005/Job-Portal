import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: '0.0.0.0',                // ✅ required by Render
    port: 4173,                     // optional but useful for local testing
    allowedHosts: ['.onrender.com'] // ✅ allow all Render subdomains
  }
})
1