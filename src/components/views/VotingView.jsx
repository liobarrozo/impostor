// src/components/views/VotingView.jsx
import React, { useState } from 'react';
import { Skull, ShieldCheck, AlertTriangle, Fingerprint, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VotingView({ playerNames, roles, ejectedPlayers, onEject, onContinueGame, onShowResults }) {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [votingStage, setVotingStage] = useState('selection'); // selection | ejecting | revealed
  const [isGameOver, setIsGameOver] = useState(false); // Estado local para saber si terminó

  const handleVote = (index) => {
    setSelectedPlayerIndex(index);
    setVotingStage('ejecting');
    
    // Llamamos a la función del hook para marcarlo como eliminado en la lógica global
    onEject(index);

    // --- CÁLCULO DE FIN DE JUEGO ---
    const isTargetImpostor = roles[index] === 'impostor';
    
    // Contamos cuántos impostores había en total
    const totalImpostors = roles.filter(r => r === 'impostor').length;
    
    // Contamos cuántos impostores YA habían sido eliminados antes de este turno
    const previouslyEjectedImpostors = ejectedPlayers.filter(idx => roles[idx] === 'impostor').length;
    
    // Si el actual es impostor, sumamos 1 a los eliminados
    const currentEjectedCount = previouslyEjectedImpostors + (isTargetImpostor ? 1 : 0);

    // Si hemos atrapado a todos, el juego termina
    const gameEnded = currentEjectedCount === totalImpostors;
    setIsGameOver(gameEnded);

    setTimeout(() => {
      setVotingStage('revealed');
    }, 2500);
  };

  const isSelectedImpostor = selectedPlayerIndex !== null && roles[selectedPlayerIndex] === 'impostor';
  const selectedName = selectedPlayerIndex !== null ? playerNames[selectedPlayerIndex] : '';

  return (
    <div className="flex flex-col items-center min-h-[85vh] w-full max-w-sm py-6 relative overflow-hidden">
       {/* Fondos (mismo código de antes) */}
      <div className="absolute inset-0 bg-black -z-20"></div>
      <div className={`absolute inset-0 transition-colors duration-1000 -z-10 opacity-20 ${
          votingStage === 'revealed' 
            ? (isSelectedImpostor ? 'bg-red-900' : 'bg-emerald-900') 
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-black'
        }`}></div>

      <AnimatePresence mode='wait'>
        
        {/* --- FASE 1: SELECCIÓN --- */}
        {votingStage === 'selection' && (
          <motion.div 
            key="selection"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -100 }}
            className="w-full px-4 flex flex-col h-full"
          >
             {/* Header igual... */}
            <div className="text-center mb-6">
               <h2 className="text-2xl font-black text-white uppercase tracking-widest">¿Quién es el traidor?</h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pb-8">
              {playerNames.map((name, idx) => {
                // Verificamos si ya estaba eliminado de rondas anteriores
                const isDead = ejectedPlayers.includes(idx);
                
                return (
                  <button
                    key={idx}
                    disabled={isDead} // Deshabilitar si ya está muerto
                    onClick={() => handleVote(idx)}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between group transition-all
                      ${isDead 
                        ? 'border-transparent bg-neutral-900 opacity-40 cursor-not-allowed grayscale' 
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border border-white/10 ${isDead ? 'bg-neutral-800' : 'bg-neutral-800'}`}>
                        {idx + 1}
                      </div>
                      <span className="font-bold text-white tracking-wide text-lg">
                        {name} {isDead && '(Eliminado)'}
                      </span>
                    </div>
                    {!isDead && <Fingerprint className="text-white/20 group-hover:text-primary transition-colors" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* --- FASE 2: ANIMACIÓN (Igual que antes) --- */}
        {votingStage === 'ejecting' && (
           <motion.div key="ejecting" className="flex flex-col items-center justify-center h-[60vh] text-center">
             {/* ... Spinner y textos de verificación de ADN ... */}
             <div className="relative w-32 h-32 mb-8">
               <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
               <Fingerprint size={48} className="text-white/50 animate-pulse absolute top-10 left-10" />
            </div>
            <h2 className="text-2xl font-black text-white">VERIFICANDO...</h2>
           </motion.div>
        )}

        {/* --- FASE 3: REVELACIÓN Y BOTONES --- */}
        {votingStage === 'revealed' && (
          <motion.div 
            key="revealed"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center w-full px-4"
          >
            {/* Mensajes de Resultado (Impostor vs Inocente) - Mismo código visual */}
            {isSelectedImpostor ? (
              <div className="flex flex-col items-center space-y-6 mb-8">
                 <Skull size={100} className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                 <div>
                   <h2 className="text-3xl font-black text-white uppercase">{selectedName}</h2>
                   <div className="bg-red-600 text-black font-bold px-4 py-1 inline-block -skew-x-12 mt-2">ERA IMPOSTOR</div>
                 </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6 mb-8">
                 <ShieldCheck size={100} className="text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]" />
                 <div>
                   <h2 className="text-3xl font-black text-white uppercase">{selectedName}</h2>
                   <div className="bg-blue-500 text-black font-bold px-4 py-1 inline-block -skew-x-12 mt-2">NO ERA IMPOSTOR</div>
                 </div>
              </div>
            )}

            {/* --- AQUÍ ESTÁN LOS BOTONES --- */}
            <div className="w-full space-y-3 mt-4">
              
              {/* Opción 1: Continuar Juego (Solo si NO ha terminado el juego) */}
              {!isGameOver && (
                <button 
                  className="btn btn-success btn-block btn-lg shadow-[0_0_15px_rgba(34,197,94,0.4)] border-none text-black font-black tracking-wider hover:scale-[1.02] transition-transform"
                  onClick={onContinueGame}
                >
                  <Play size={24} fill="black" /> CONTINUAR MISIÓN
                </button>
              )}

              {/* Opción 2: Ver Resultados (Siempre visible, pero cambia estilo si es la única opción) */}
              <button 
                className={`btn btn-block ${isGameOver ? 'btn-primary btn-lg' : 'btn-outline border-white/30 text-white hover:bg-white/10'}`}
                onClick={onShowResults}
              >
                {isGameOver ? 'Ver Informe Final' : 'Terminar Partida'} <ChevronRight />
              </button>
              
            </div>

            {/* Mensaje de estado del juego */}
            {!isGameOver && isSelectedImpostor && (
               <p className="mt-4 text-xs text-green-500 font-mono">¡Aún quedan impostores sueltos!</p>
            )}
            {!isGameOver && !isSelectedImpostor && (
               <p className="mt-4 text-xs text-red-400 font-mono">Los impostores siguen entre nosotros...</p>
            )}
            {isGameOver && (
               <p className="mt-4 text-xs text-primary font-bold font-mono animate-pulse">TODAS LAS AMENAZAS ELIMINADAS</p>
            )}

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}