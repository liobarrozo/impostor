import React from 'react';
import { Play } from 'lucide-react';
import { WORD_CATEGORIES } from '../../constants/words';

export default function SetupView({ config, setConfig, onStart }) {
  const categories = Object.keys(WORD_CATEGORIES);

  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold justify-center mb-4">🕵️ Nuevo Juego</h2>
        
        {/* Categoría */}
        <div className="form-control w-full">
          <label className="label"><span className="label-text">Categoría</span></label>
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
          <label className="label"><span>Jugadores: {config.players}</span></label>
          <input type="range" min="3" max="12" value={config.players} 
            className="range range-primary" 
            onChange={(e) => setConfig({...config, players: parseInt(e.target.value)})} 
          />
        </div>

        <div className="form-control mt-4">
          <label className="label"><span>Impostores: {config.impostors}</span></label>
          <input type="range" min="1" max={Math.floor(config.players / 2)} value={config.impostors} 
            className="range range-error" 
            onChange={(e) => setConfig({...config, impostors: parseInt(e.target.value)})} 
          />
        </div>

        <button className="btn btn-primary btn-block mt-6 text-lg" onClick={onStart}>
          <Play size={20} /> Jugar
        </button>
      </div>
    </div>
  );
}