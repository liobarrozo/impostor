// src/components/views/SetupView.jsx
import React from 'react';
import { Play, User } from 'lucide-react';
import { WORD_CATEGORIES } from '../../constants/words';

export default function SetupView({ config, setConfig, playerNames, updatePlayerName, onStart }) {
  const categories = Object.keys(WORD_CATEGORIES);

  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl my-4">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold justify-center mb-4">🕵️ Configuración</h2>
        
        {/* Categoría */}
        <div className="form-control w-full">
          <label className="label"><span className="label-text font-bold">Categoría</span></label>
          <select 
            className="select select-bordered"
            value={config.category}
            onChange={(e) => setConfig({...config, category: e.target.value})}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Sliders */}
        <div className="form-control mt-4">
          <label className="label"><span className="label-text font-bold">Jugadores: {config.players}</span></label>
          <input type="range" min="3" max="12" value={config.players} 
            className="range range-primary" 
            onChange={(e) => setConfig({...config, players: parseInt(e.target.value)})} 
          />
        </div>

        <div className="form-control mt-2">
          <label className="label"><span className="label-text font-bold">Impostores: {config.impostors}</span></label>
          <input type="range" min="1" max={Math.floor(config.players / 2)} value={config.impostors} 
            className="range range-error" 
            onChange={(e) => setConfig({...config, impostors: parseInt(e.target.value)})} 
          />
        </div>

        {/* LISTA DE NOMBRES */}
        <div className="divider text-xs">Nombres de Jugadores</div>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
          {/* Solo mostramos los inputs según la cantidad seleccionada en el slider */}
          {Array.from({ length: config.players }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <User size={16} className="opacity-50" />
              <input 
                type="text" 
                className="input input-sm input-bordered w-full"
                value={playerNames[index]}
                onChange={(e) => updatePlayerName(index, e.target.value)}
                placeholder={`Jugador ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-block mt-6 text-lg" onClick={onStart}>
          <Play size={20} /> Jugar
        </button>
      </div>
    </div>
  );
} 