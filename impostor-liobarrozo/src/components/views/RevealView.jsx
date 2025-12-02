import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function RevealView({ currentPlayer, totalPlayers, role, word, category, onNext }) {
  const [isRevealing, setIsRevealing] = useState(false);
  const isImpostor = role === 'impostor';

  return (
    <div className="w-full max-w-sm text-center text-neutral-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Jugador {currentPlayer + 1}</h1>
        <p className="opacity-70">de {totalPlayers}</p>
      </div>

      {!isRevealing ? (
        <button 
          className="btn btn-circle btn-outline btn-lg w-32 h-32 border-4 animate-pulse"
          onClick={() => setIsRevealing(true)}
        >
          <Eye size={40} />
          <span className="block text-xs mt-1">Ver Rol</span>
        </button>
      ) : (
        <div className="card bg-base-100 text-base-content shadow-2xl animate-in zoom-in duration-300">
          <div className="card-body items-center text-center py-10">
            {isImpostor ? (
              <>
                <div className="text-6xl mb-2">🤫</div>
                <h2 className="text-error text-2xl font-bold">¡ERES EL IMPOSTOR!</h2>
                <p>Engaña a los demás.</p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-2">🔒</div>
                <h2 className="text-success text-xl font-bold">CIUDADANO</h2>
                <p className="text-3xl font-bold uppercase my-2">{word}</p>
                <p className="text-xs opacity-70">Tema: {category}</p>
              </>
            )}
            
            <button className="btn btn-neutral btn-block mt-6" onClick={onNext}>
              <EyeOff size={18} /> Ocultar y Pasar
            </button>
          </div>
        </div>
      )}
      
      {/* Pasos visuales */}
      <ul className="steps mt-8">
        {Array(totalPlayers).fill(0).map((_, i) => (
           <li key={i} className={`step ${i <= currentPlayer ? 'step-primary' : ''}`}></li>
        ))}
      </ul>
    </div>
  );
}