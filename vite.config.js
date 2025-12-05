import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' // 👈 Importamos esto

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 👇 Agregamos toda la configuración de la PWA aquí
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Infiltrado',
        short_name: 'Infiltrado',
        description: 'Juego de deducción social y espionaje.',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone', // Esto quita la barra del navegador
        orientation: 'portrait', // Bloquea la rotación (ideal para este juego)
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png', // Necesitarás esta imagen en public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png', // Y esta también
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})