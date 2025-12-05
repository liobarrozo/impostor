// src/components/views/ResultView.jsx
import React, { useState, useEffect } from 'react';
import { RefreshCw, Skull, ShieldCheck, Fingerprint, LockOpen, Siren } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultView({ word, roles, playerNames, ejectedPlayers, onReset }) {
  const [stage, setStage] = useState('scanning'); // scanning | revealed

  // --- LÓGICA DE GANADOR ---
  // Calculamos cuántos impostores siguen vivos (su índice NO está en ejectedPlayers)
  const survivingImpostors = roles.reduce((acc, role, index) => {
    if (role === 'impostor' && !ejectedPlayers.includes(index)) {
      return [...acc, index];
    }
    return acc;
  }, []);

  // Si queda al menos 1 impostor vivo, ganan los impostores.
  const impostorsWon = survivingImpostors.length > 0;

  // Colores dinámicos según el ganador
  const themeColor = impostorsWon ? 'red' : 'emerald';
  const ThemeIcon = impostorsWon ? Skull : ShieldCheck;

  // Efecto de tensión inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('revealed');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full max-w-sm py-6 overflow-hidden relative">
       
       {/* Fondo Dinámico */}
       <div className="absolute inset-0 bg-black -z-20"></div>
       <div className={`absolute inset-0 transition-opacity duration-1000 -z-10 
         ${stage === 'revealed' ? 'opacity-40' : 'opacity-0'}
         ${impostorsWon 
            ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900 via-black to-black' 
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900 via-black to-black'
         }
       `}></div>

       <AnimatePresence mode='wait'>
         
         {/* --- FASE 1: COMPUTANDO RESULTADOS --- */}
         {stage === 'scanning' && (
           <motion.div 
             key="scanning"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(10px)" }}
             className="flex flex-col items-center justify-center text-center space-y-8"
           >
             <div className="relative">
               <div className="absolute inset-0 bg-white/10 blur-3xl animate-pulse"></div>
               <Fingerprint size={100} className="text-white/50 animate-pulse relative z-10" />
               {/* Barra de escaneo */}
               <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_rgba(0,255,0,0.8)] z-20"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               />
             </div>
             
             <div>
               <h2 className="text-xl font-mono text-white font-bold animate-pulse">VERIFICANDO BAJAS</h2>
               <p className="text-xs text-white/40 mt-2 font-mono tracking-widest">CALCULANDO INTEGRIDAD DEL SISTEMA...</p>
             </div>
           </motion.div>
         )}

         {/* --- FASE 2: VEREDICTO FINAL --- */}
         {stage === 'revealed' && (
           <motion.div 
             key="result"
             initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
             transition={{ type: "spring", stiffness: 100 }}
             className="w-full px-4 flex flex-col items-center h-full"
           >
             
             {/* 1. HEADER DE VICTORIA/DERROTA */}
             <div className="text-center mb-8 relative">
                {impostorsWon && (
                   <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse"></div>
                )}
                
                <div className={`inline-flex p-4 rounded-full mb-4 border-2 shadow-2xl backdrop-blur-md
                    ${impostorsWon ? 'bg-red-950/50 border-red-500 text-red-500' : 'bg-emerald-950/50 border-emerald-500 text-emerald-500'}
                `}>
                   <ThemeIcon size={48} />
                </div>
                
                <h1 className={`text-4xl font-black italic tracking-tighter uppercase transform -skew-x-6 drop-shadow-lg mb-1
                    ${impostorsWon ? 'text-red-500' : 'text-emerald-500'}
                `}>
                   {impostorsWon ? 'IMPOSTORES GANAN' : 'INOCENTES GANAN'}
                </h1>
                
                <p className="text-xs font-mono text-white/60 tracking-widest uppercase">
                   {impostorsWon ? 'SISTEMA COMPROMETIDO' : 'AMENAZAS ELIMINADAS'}
                </p>
             </div>

             {/* 2. LA PALABRA SECRETA */}
             <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-center mb-6 backdrop-blur-md">
                <div className="flex items-center justify-center gap-2 text-white/40 mb-1">
                   <LockOpen size={12} /> <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Palabra Clave</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-wide">{word}</h2>
             </div>

             {/* 3. DESGLOSE DE ROLES */}
             <div className="w-full flex-1 overflow-y-auto space-y-3 mb-6 pr-1 scrollbar-hide">
               <div className="text-xs text-white/30 font-mono uppercase tracking-widest mb-2 text-center">Informe de Agentes</div>
               
               {roles.map((role, idx) => {
                 const isDead = ejectedPlayers.includes(idx);
                 const isImpostor = role === 'impostor';
                 const isWinner = (impostorsWon && isImpostor) || (!impostorsWon && !isImpostor);

                 return (
                   <div key={idx} className={`
                      flex items-center justify-between p-3 rounded-lg border
                      ${isWinner 
                        ? (impostorsWon ? 'bg-red-900/20 border-red-500/30' : 'bg-emerald-900/20 border-emerald-500/30') 
                        : 'bg-neutral-900/50 border-white/5 opacity-60'}
                   `}>
                      <div className="flex items-center gap-3">
                         {/* Icono de Estado (Vivo/Muerto) */}
                         <div className={`text-xs font-bold px-2 py-0.5 rounded ${isDead ? 'bg-neutral-700 text-neutral-400 line-through' : 'bg-white text-black'}`}>
                            {isDead ? 'BAJA' : 'VIVO'}
                         </div>
                         <div className="flex flex-col">
                            <span className={`font-bold text-sm ${isWinner ? 'text-white' : 'text-white/50'}`}>
                               {playerNames[idx]}
                            </span>
                            <span className={`text-[10px] uppercase font-mono ${isImpostor ? 'text-red-400' : 'text-emerald-400'}`}>
                               {isImpostor ? 'Impostor' : 'Inocente'}
                            </span>
                         </div>
                      </div>
                      
                      {/* Icono de Ganador */}
                      {isWinner && (
                         <div className="text-xs">🏆</div>
                      )}
                   </div>
                 )
               })}
             </div>

             {/* 4. BOTÓN REINICIAR */}
             <button 
                className={`btn btn-block btn-lg border-0 text-black font-black tracking-widest hover:scale-[1.02] transition-transform
                    ${impostorsWon ? 'bg-red-500 hover:bg-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]'}
                `}
                onClick={onReset}
             >
               <RefreshCw size={20} className="mr-2" /> 
               NUEVA OPERACIÓN
             </button>

           </motion.div>
         )}

       </AnimatePresence>
    </div>
  );
}