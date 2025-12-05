import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function ResultView({ word, roles, onReset }) {
  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl text-center">
      <div className="card-body">
        <h2 className="text-2xl font-bold mb-4">Fin del Juego</h2>
        
        <div className="stats shadow my-4 w-full">
          <div className="stat">
            <div className="stat-title">La palabra era</div>
            <div className="stat-value text-primary text-2xl">{word}</div>
          </div>
        </div>

        <div className="divider">IMPOSTORES</div>
        
        <div className="flex flex-col gap-2">
          {roles.map((role, idx) => (
            role === 'impostor' && (
              <div key={idx} className="alert alert-error shadow-sm">
                <span>Jugador {idx + 1}</span>
              </div>
            )
          ))}
        </div>

        <button className="btn btn-outline mt-8" onClick={onReset}>
          <RefreshCw size={20} /> Jugar otra vez
        </button>
      </div>
    </div>
  );
}