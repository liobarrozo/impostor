import React, { useState } from 'react';
import { Play, Users, Skull, Target, Crosshair, User, Settings, ScanLine, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORD_CATEGORIES } from '../../constants/words';

export default function SetupView({ config, setConfig, playerNames, updatePlayerName, onStart }) {
  const categories = Object.keys(WORD_CATEGORIES);
  // Estado para controlar si el acordeón de nombres está abierto
  const [showNames, setShowNames] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-[90vh] w-full max-w-sm py-4 relative">
      
      {/* --- FONDO ESTÉTICO --- */}
      <div className="absolute inset-0 bg-black -z-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] -z-10"></div>
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent -z-10 pointer-events-none blur-xl"></div>

      {/* --- LOGO COMPACTO --- */}
      <div className="flex flex-col items-center mb-6 relative z-10 w-full shrink-0">
         <div className="text-[10px] text-primary/40 font-mono mb-1 tracking-[0.5em] flex items-center gap-2">
            <ScanLine size={10} /> SECURE LINK
         </div>
         <div className="relative">
            <h1 className="relative text-5xl font-black italic tracking-tighter text-white transform -skew-x-6 drop-shadow-lg">
               INFILTRADO<span className="text-primary">.</span>
            </h1>
         </div>
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4"></div>
      </div>

      {/* --- SCROLL AREA --- */}
      <div className="w-full px-4 pb-32 overflow-y-auto scrollbar-hide">
        
        {/* BLOQUE 1: PARÁMETROS DE MISIÓN (Siempre visible) */}
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
               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-[10px]">
                  ▼
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
                   type="range" min="3" max="12" value={config.players} 
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

        {/* BLOQUE 2: LISTA DE NOMBRES (ACORDEÓN) */}
        <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
           
           {/* Botón Toggle */}
           <button 
             onClick={() => setShowNames(!showNames)}
             className="w-full p-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors group"
           >
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-lg ${showNames ? 'bg-primary/20 text-primary' : 'bg-neutral-800 text-white/40'}`}>
                    <Edit3 size={16} />
                 </div>
                 <div className="text-left">
                    <p className="text-sm font-bold text-white uppercase tracking-wide">Registro de Personal</p>
                    <p className="text-[10px] text-white/40 font-mono">
                       {showNames ? 'Cerrar editor' : 'Editar nombres (Opcional)'}
                    </p>
                 </div>
              </div>
              <div className={`text-white/40 transition-transform duration-300 ${showNames ? 'rotate-180' : ''}`}>
                 <ChevronDown size={20} />
              </div>
           </button>

           {/* Contenido Desplegable */}
           <AnimatePresence>
             {showNames && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: "auto", opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 transition={{ duration: 0.3, ease: "easeInOut" }}
                 className="overflow-hidden"
               >
                 <div className="p-4 pt-2 space-y-2 border-t border-white/5">
                   {Array.from({ length: config.players }).map((_, index) => (
                     <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300" style={{animationDelay: `${index * 50}ms`}}>
                       <div className="text-[10px] font-mono text-white/30 w-5 text-right">
                          {(index + 1).toString().padStart(2, '0')}
                       </div>
                       <div className="relative w-full">
                          <input 
                            type="text" 
                            className="input input-sm w-full bg-black border border-white/10 text-white font-bold placeholder-white/20 focus:border-primary focus:bg-primary/5 transition-all pl-8 rounded-md h-9 text-xs"
                            value={playerNames[index]}
                            onChange={(e) => updatePlayerName(index, e.target.value)}
                            placeholder={`Agente ${index + 1}`}
                          />
                          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20">
                             <User size={12} />
                          </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

      </div>

      {/* --- FOOTER FLOTANTE (BOTÓN START) --- */}
      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 pt-12 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none flex justify-center z-50">
         <button 
           className="btn btn-primary btn-block btn-lg shadow-[0_0_30px_rgba(0,255,0,0.2)] border-none text-black font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all pointer-events-auto relative overflow-hidden group max-w-sm" 
           onClick={onStart}
         >
           <div className="absolute top-0 -left-full w-full h-full bg-white/40 -skew-x-12 group-hover:animate-[shimmer_1s_infinite]"></div>
           <div className="flex items-center gap-3 relative z-10">
             <Play size={20} fill="black" /> 
             INICIAR OPERACIÓN
           </div>
         </button>
      </div>

    </div>
  );
}