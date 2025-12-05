import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' // 👈 1. Importante

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 👇 2. Importante: La configuración de la PWA
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // 👇 Esto permite que funcione en "npm run dev" para pruebas
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Infiltrado',
        short_name: 'Infiltrado',
        description: 'Juego de espionaje',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})