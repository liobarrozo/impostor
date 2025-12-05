import React from 'react';
import { Timer } from 'lucide-react';

export default function PlayingView({ timer, category, onFinish }) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="flex flex-col items-center w-full max-w-sm gap-4">
      {/* Timer */}
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <Timer className="w-10 h-10 text-primary mb-2" />
          <span className="countdown font-mono text-6xl">
            <span style={{"--value": minutes}}></span>:
            <span style={{"--value": seconds}}></span>
          </span>
          <p className="text-sm opacity-60">Tiempo restante</p>
        </div>
      </div>

      {/* Info */}
      <div className="alert alert-info shadow-lg">
        <div>
          <span className="font-bold">Categoría actual:</span> {category}
        </div>
      </div>

      <button className="btn btn-error btn-block btn-lg" onClick={onFinish}>
        Terminar / Votar
      </button>
    </div>
  );
}