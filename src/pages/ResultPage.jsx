import { useState, useEffect } from 'react';
import { RefreshCw, UserRound, LockOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGameStatus } from '../utils/gameStatus';
import Screen from '../components/ui/Screen';
import VerdictHeader from '../components/result/VerdictHeader';
import AgentReport from '../components/result/AgentReport';

export default function ResultPage({ word, roles, playerNames, ejectedPlayers, onReset }) {
  const [stage, setStage] = useState('scanning'); // scanning | revealed

  const { impostorsWon } = getGameStatus(roles, ejectedPlayers);

  // Efecto de tensión inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('revealed');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen
      className="justify-center py-6 overflow-hidden"
      tint={stage === 'revealed'
        ? (impostorsWon ? 'bg-red-900 opacity-40' : 'bg-emerald-900 opacity-40')
        : ''}
    >

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
               <UserRound size={100} className="text-white/50 animate-pulse relative z-10" />
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

             <VerdictHeader impostorsWon={impostorsWon} />

             {/* LA PALABRA SECRETA */}
             <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-center mb-6 backdrop-blur-md">
                <div className="flex items-center justify-center gap-2 text-white/40 mb-1">
                   <LockOpen size={12} /> <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Palabra Clave</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-wide">{word}</h2>
             </div>

             <AgentReport
               roles={roles}
               playerNames={playerNames}
               ejectedPlayers={ejectedPlayers}
               impostorsWon={impostorsWon}
             />

             {/* BOTÓN REINICIAR */}
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
    </Screen>
  );
}
