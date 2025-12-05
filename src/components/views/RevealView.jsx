// src/components/views/RevealView.jsx
import React, { useState } from 'react';
import { Eye, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion'; // 👈 Importamos esto

export default function RevealView({ playerName, currentPlayer, totalPlayers, role, word, category, onNext }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isImpostor = role === 'impostor';

  // Configuración de la animación "Resorte" (Spring)
  const springAnim = {
    type: "spring",
    stiffness: 260,
    damping: 20
  };

  const handleDragEnd = (event, info) => {
    // Si arrastró más de 100px o lo hizo muy rápido (swipe), volteamos
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh] w-full max-w-sm py-4 overflow-x-hidden">
      
      {/* Cabecera */}
      <div className="text-center text-neutral-content mb-4 select-none">
        <h1 className="text-3xl font-bold text-primary">{playerName}</h1>
        <p className="opacity-70 text-sm">Jugador {currentPlayer + 1} de {totalPlayers}</p>
        <div className="flex items-center justify-center gap-2 text-xs mt-2 opacity-50 animate-pulse">
           <span>👈 Desliza o toca para voltear 👉</span>
        </div>
      </div>

      {/* --- CARTA GIRATORIA INTERACTIVA --- */}
      <div className="relative w-72 h-96 perspective-1000">
        <motion.div
          className="w-full h-full relative cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
          // 1. Animación basada en estado
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={springAnim}
          // 2. Propiedades de arrastre (Gestos)
          drag="x" 
          dragConstraints={{ left: 0, right: 0 }} 
          dragElastic={0.2} // Cuánto "resiste" la carta al dedo
          onDragEnd={handleDragEnd}
          onClick={() => setIsFlipped(!isFlipped)} // Mantener click por si acaso
        >

          {/* --- CARA FRONTAL (Tapada) --- */}
          <div 
            className="absolute w-full h-full rounded-2xl shadow-2xl overflow-hidden border-4 border-base-100 bg-neutral flex flex-col items-center justify-center p-6 text-neutral-content"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="bg-base-100/10 p-6 rounded-full mb-4 pointer-events-none">
               <Eye size={64} />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest select-none">Secreto</h2>
            
            {/* Decoración */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral to-neutral pointer-events-none"></div>
          </div>

          {/* --- CARA TRASERA (Revelada) --- */}
          <div 
            className="absolute w-full h-full rounded-2xl shadow-xl overflow-hidden bg-base-100 text-base-content flex flex-col items-center justify-center p-6 text-center border-4 border-base-300"
            style={{ 
              backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)' // CSS base para que mire al otro lado
            }}
          >
            {isImpostor ? (
              <div className="flex flex-col items-center select-none">
                <div className="w-24 h-24 bg-error/20 rounded-full flex items-center justify-center mb-4 text-6xl">
                  🤫
                </div>
                <h2 className="text-3xl font-black text-error mb-2">IMPOSTOR</h2>
                <p className="text-sm opacity-70">Engaña a todos.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center select-none">
                <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-4 text-6xl">
                  🕵️
                </div>
                <h2 className="text-xl font-bold text-success mb-1">CIUDADANO</h2>
                <div className="bg-base-200 w-full py-4 rounded-xl border border-base-300 my-4">
                  <p className="text-3xl font-black text-primary uppercase">{word}</p>
                </div>
                <p className="text-xs opacity-60">Categoría: {category}</p>
              </div>
            )}
          </div>

        </motion.div>
      </div>

      {/* Footer */}
      <div className="w-full mt-8 px-4">
        {/* El botón ahora ocupa todo el ancho y es más prominente */}
        <button 
          className="btn btn-primary btn-block btn-lg shadow-lg text-lg"
          onClick={onNext}
        >
          Siguiente Jugador <ChevronRight />
        </button>
        
        <div className="flex justify-center mt-6 gap-1">
          {Array(totalPlayers).fill(0).map((_, i) => (
             <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i <= currentPlayer ? 'w-6 bg-primary' : 'w-2 bg-neutral'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}