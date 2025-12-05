// src/components/views/ResultView.jsx
import React, { useState, useEffect } from 'react';
import { RefreshCw, Skull, ScanLine, Fingerprint, LockOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultView({ word, roles, playerNames, onReset }) {
  const [stage, setStage] = useState('scanning'); // scanning | revealed

  // Efecto de tensión: Esperar 3 segundos antes de mostrar
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('revealed');
    }, 3500); // 3.5 segundos de tensión
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full max-w-sm py-6 overflow-hidden relative">
       {/* Fondo oscuro consistente */}
       <div className="absolute inset-0 bg-black -z-20"></div>
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-black -z-10"></div>

       <AnimatePresence mode='wait'>
         
         {/* --- FASE 1: ESCANEO Y TENSIÓN --- */}
         {stage === 'scanning' && (
           <motion.div 
             key="scanning"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
             className="flex flex-col items-center justify-center text-center space-y-8"
           >
             <div className="relative">
               <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse"></div>
               <Fingerprint size={120} className="text-primary/50 animate-pulse relative z-10" />
               <motion.div 
                  className="absolute top-0 left-0 w-full h-2 bg-primary shadow-[0_0_20px_rgba(0,255,0,0.8)] z-20"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               />
             </div>
             
             <div>
               <h2 className="text-2xl font-mono text-primary font-bold animate-pulse">ANALIZANDO VOTOS</h2>
               <p className="text-xs text-primary/60 mt-2 font-mono tracking-widest">DECRIPTANDO IDENTIDADES...</p>
             </div>

             {/* Pseudo-código decorativo */}
             <div className="text-[10px] font-mono text-green-500/30 text-left w-64 overflow-hidden h-24">
                {Array(10).fill(0).map((_, i) => (
                  <div key={i}>0x{Math.random().toString(16).substr(2, 8)}... PROCESSING_NODE_{i}</div>
                ))}
             </div>
           </motion.div>
         )}

         {/* --- FASE 2: LA REVELACIÓN --- */}
         {stage === 'revealed' && (
           <motion.div 
             key="result"
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ type: "spring", stiffness: 100 }}
             className="w-full px-4 flex flex-col items-center"
           >
             
             {/* HEADER: LA PALABRA */}
             <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-emerald-500/20 blur-2xl rounded-full"></div>
                <div className="flex items-center justify-center gap-2 text-emerald-500 mb-2">
                   <LockOpen size={16} /> <span className="text-xs font-bold tracking-[0.3em] uppercase">Palabra Secreta</span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-wide uppercase drop-shadow-md">{word}</h1>
             </div>

             {/* LISTA DE IMPOSTORES */}
             <div className="w-full space-y-4 mb-8">
               <div className="text-center">
                 <h3 className="text-red-500 font-black tracking-[0.2em] uppercase text-sm mb-4 bg-red-500/10 inline-block px-4 py-1 rounded-full border border-red-500/20">
                    Amenazas Identificadas
                 </h3>
               </div>

               {roles.map((role, idx) => (
                 role === 'impostor' && (
                   <motion.div 
                     key={idx}
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="bg-gradient-to-r from-red-950/80 to-black border-l-4 border-red-600 p-4 rounded-r-xl shadow-lg flex items-center justify-between"
                   >
                     <div className="flex items-center gap-4">
                        <div className="bg-red-600/20 p-2 rounded-full">
                           <Skull size={24} className="text-red-500" />
                        </div>
                        <div>
                           <p className="text-xs text-red-400 font-mono uppercase">Impostor</p>
                           <p className="text-xl font-bold text-white">{playerNames[idx]}</p>
                        </div>
                     </div>
                     <div className="text-red-500/20">
                        <ScanLine size={24} />
                     </div>
                   </motion.div>
                 )
               ))}
             </div>

             {/* BOTÓN REINICIAR */}
             <button 
                className="btn btn-outline w-full gap-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all mt-4 group" 
                onClick={onReset}
             >
               <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 
               NUEVA MISIÓN
             </button>

           </motion.div>
         )}

       </AnimatePresence>
    </div>
  );
}