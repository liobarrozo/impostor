import React, { useState } from 'react';
import { ChevronRight, Lock, Fingerprint, Skull, ShieldCheck, ScanFace } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RevealView({ playerName, currentPlayer, totalPlayers, role, word, category, onNext }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasSeenRole, setHasSeenRole] = useState(false);
  const isImpostor = role === 'impostor';

  const springAnim = {
    type: "spring",
    stiffness: 260,
    damping: 20
  };

  const handleFlip = () => {
    const newState = !isFlipped;
    setIsFlipped(newState);
    if (!hasSeenRole && newState === true) {
      setHasSeenRole(true);
    }
  };

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
      handleFlip();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh] w-full max-w-sm py-6 overflow-x-hidden">
      
      {/* 1. CABECERA */}
      <div className="text-center mb-6 select-none relative z-10">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase tracking-tighter">
          {playerName}
        </h1>
        <div className="badge badge-outline badge-sm mt-2 opacity-70">
           Agente {currentPlayer + 1} / {totalPlayers}
        </div>
      </div>

      {/* 2. CARTA 3D INTERACTIVA */}
      <div className="relative w-72 h-[420px] perspective-1000">
        <motion.div
          className="w-full h-full relative cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={springAnim}
          drag="x" 
          dragConstraints={{ left: 0, right: 0 }} 
          dragElastic={0.2} 
          onDragEnd={handleDragEnd}
          onClick={handleFlip}
        >
          
          {/* --- LADO A: PORTADA (TOP SECRET) --- */}
          <div 
            className="absolute w-full h-full rounded-3xl overflow-hidden border-[1px] border-white/10 bg-neutral-900 shadow-2xl flex flex-col items-center justify-center p-6 text-white"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black pointer-events-none"></div>

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                <div className="border-2 border-primary/50 p-6 rounded-full bg-black/50 backdrop-blur-sm">
                   <Fingerprint size={64} className="text-primary animate-pulse" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-[0.2em] text-white/80">CONFIDENCIAL</h2>
                <p className="text-xs text-white/40 font-mono">TOCA PARA ESCANEAR IDENTIDAD</p>
              </div>

              {/* Barra de carga decorativa */}
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                 <div className="h-full bg-primary w-1/2 animate-[wiggle_2s_infinite]"></div>
              </div>
            </div>
            
            {/* Bordes decorativos esquinas */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>
          </div>


          {/* --- LADO B: REVELACIÓN (ROL) --- */}
          <div 
            className={`absolute w-full h-full rounded-3xl overflow-hidden border-[1px] shadow-2xl flex flex-col items-center justify-center p-6 text-center
              ${isImpostor ? 'bg-red-950 border-red-500/30' : 'bg-slate-900 border-emerald-500/30'}
            `}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Gradiente de fondo dramático */}
            <div className={`absolute inset-0 bg-gradient-to-b ${isImpostor ? 'from-red-900/50 via-black to-black' : 'from-emerald-900/50 via-black to-black'} opacity-80`}></div>

            {isImpostor ? (
              // --- DISEÑO IMPOSTOR ---
              <div className="relative z-10 flex flex-col items-center h-full justify-between py-8">
                <div className="space-y-4">
                  <div className="text-red-500 font-mono text-xs tracking-[0.3em] uppercase border border-red-500/30 px-3 py-1 rounded">Amenaza Detectada</div>
                  <div className="relative flex justify-center">
                     <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 animate-pulse"></div>
                     <Skull size={100} className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">IMPOSTOR</h2>
                  <p className="text-red-200/60 text-sm font-medium">Infiltrate. Miente. Sobrevive.</p>
                </div>

                <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-xl w-full backdrop-blur-md">
                   <p className="text-xs text-red-300">OBJETIVO</p>
                   <p className="font-bold text-white">Descubre la palabra secreta</p>
                </div>
              </div>
            ) : (
              // --- DISEÑO CIUDADANO ---
              <div className="relative z-10 flex flex-col items-center h-full justify-between py-8">
                <div className="space-y-4">
                  <div className="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase border border-emerald-500/30 px-3 py-1 rounded">Acceso Concedido</div>
                  <div className="relative flex justify-center">
                     <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20"></div>
                     <ShieldCheck size={100} className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  </div>
                </div>

                <div className="w-full">
                  <h2 className="text-xl font-bold text-white/80 mb-4 tracking-wide">CLAVE DE ACCESO</h2>
                  
                  {/* Tarjeta de palabra estilo "Documento" */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
                    <p className="text-3xl font-black text-emerald-400 uppercase tracking-wide break-words shadow-black drop-shadow-md">
                      {word}
                    </p>
                  </div>
                  <p className="text-xs text-emerald-500/50 mt-2 font-mono uppercase tracking-widest">{category}</p>
                </div>

                <div className="opacity-50 text-[10px] text-white max-w-[200px]">
                  NO REVELAR
                </div>
              </div>
            )}
          </div>

        </motion.div>
      </div>

      {/* 3. FOOTER / ACCIONES */}
      <div className="w-full px-6 mt-4 relative z-10">
        <button 
          disabled={!hasSeenRole}
          className={`group btn btn-block btn-lg border-0 relative overflow-hidden transition-all duration-300 ${
            hasSeenRole 
              ? 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
          }`}
          onClick={onNext}
        >
          {hasSeenRole ? (
             <div className="flex items-center justify-center gap-2">
                <span className="font-bold tracking-widest">SIGUIENTE JUGADOR</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </div>
          ) : (
             <div className="flex items-center justify-center gap-2">
                <Lock size={18} />
                <span className="font-mono text-xs">IDENTIDAD NO VERIFICADA</span>
             </div>
          )}
        </button>
      </div>

    </div>
  );
}