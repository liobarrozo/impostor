import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

// Botón PWA: se dibuja solo si el navegador ofrece instalar. Se guarda su propio
// evento, así Setup no carga con estado que no es suyo.
export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      // Prevenir que Chrome muestre el aviso automático (para controlarlo nosotros)
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!deferredPrompt) return null;

  const handleInstallClick = async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <button
        onClick={handleInstallClick}
        className="btn btn-outline btn-sm w-full border-primary/30 text-primary hover:bg-primary hover:text-black gap-2 font-mono uppercase tracking-widest"
      >
        <Download size={16} /> Instalar Aplicación
      </button>
    </motion.div>
  );
}
