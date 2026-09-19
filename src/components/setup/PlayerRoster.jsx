import { useState } from 'react';
import { User, ChevronDown, Edit3, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Acordeón de nombres. Abierto/cerrado es asunto suyo, no de la página.
export default function PlayerRoster({ playerCount, playerNames, updatePlayerName, onAddPlayer, maxPlayers = 25 }) {
  const [showNames, setShowNames] = useState(false);

  return (
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
               {Array.from({ length: playerCount }).map((_, index) => (
                 <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300" style={{animationDelay: `${index * 50}ms`}}>
                   <div className="text-[10px] font-mono text-white/30 w-5 text-right">
                      {(index + 1).toString().padStart(2, '0')}
                   </div>
                   <div className="relative w-full">
                      <input
                        type="text"
                        className="input input-sm w-full bg-black border border-white/10 text-white font-bold placeholder-white/20 focus:border-primary focus:bg-primary/5 transition-all pl-8 rounded-md h-9 text-xs"
                        value={playerNames[index] || ''}
                        onChange={(e) => updatePlayerName(index, e.target.value)}
                        placeholder={`Agente ${index + 1}`}
                      />
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20">
                         <User size={12} />
                      </div>
                   </div>
                 </div>
               ))}

               {playerCount < maxPlayers && (
                 <button
                   onClick={onAddPlayer}
                   className="w-full flex items-center justify-center gap-2 h-9 rounded-md border border-dashed border-white/20 text-white/40 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-[11px] font-mono uppercase tracking-wide"
                 >
                   <UserPlus size={12} /> Agregar Agente
                 </button>
               )}
             </div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
