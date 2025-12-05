import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Analytics } from '@vercel/analytics/react'
import { registerSW } from 'virtual:pwa-register'

// 👇 EJECUTA EL REGISTRO
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Hay una nueva versión disponible. ¿Recargar?")) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App lista para trabajar offline')
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)