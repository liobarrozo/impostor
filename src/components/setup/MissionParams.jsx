import { Users, Skull, Target, Settings, ChevronDown } from 'lucide-react';
import { WORD_CATEGORIES } from '../../constants/words';

// Categoría + cantidad de agentes e infiltrados.
export default function MissionParams({ config, setConfig }) {
  const categories = Object.keys(WORD_CATEGORIES);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md mb-4 relative overflow-hidden">
       {/* Decoración lateral */}
       <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>

       <div className="flex items-center gap-2 mb-4 text-primary/80">
          <Settings size={14} />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">Parámetros de Misión</span>
       </div>

       {/* Selector de Categoría */}
       <div className="mb-5">
         <div className="relative">
           <select
             className="select select-sm w-full bg-black/50 border-white/20 text-white font-mono focus:border-primary transition-all h-10 pl-9 rounded-lg appearance-none text-sm"
             value={config.category}
             onChange={(e) => setConfig({...config, category: e.target.value})}
           >
             {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
           </select>
           <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
              <Target size={14} />
           </div>
           <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <ChevronDown size={14} />
           </div>
         </div>
       </div>

       {/* Sliders Compactos */}
       <div className="space-y-4">
          {/* Jugadores */}
          <div>
             <div className="flex justify-between items-center mb-1">
               <span className="text-xs text-white/60 font-mono flex items-center gap-1"><Users size={12}/> Agentes</span>
               <span className="text-primary font-bold font-mono text-sm">{config.players}</span>
             </div>
             <input
               type="range" min="3" max="25" value={config.players}
               className="range range-xs range-primary"
               onChange={(e) => setConfig({...config, players: parseInt(e.target.value)})}
             />
          </div>

          {/* Impostores */}
          <div>
             <div className="flex justify-between items-center mb-1">
               <span className="text-xs text-white/60 font-mono flex items-center gap-1"><Skull size={12}/> Amenazas</span>
               <span className="text-error font-bold font-mono text-sm">{config.impostors}</span>
             </div>
             <input
               type="range" min="1" max={Math.floor(config.players / 2)} value={config.impostors}
               className="range range-xs range-error"
               onChange={(e) => setConfig({...config, impostors: parseInt(e.target.value)})}
             />
          </div>
       </div>
    </div>
  );
}
