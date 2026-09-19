import { Skull, ShieldCheck, ChevronRight, Play } from 'lucide-react';

// Veredicto de la votación: quién cayó, si sigue la partida y cómo seguir.
export default function EjectionResult({ name, isImpostor, isGameOver, gameOverReason, onContinueGame, onShowResults }) {
  return (
    <>
      {isImpostor ? (
        <div className="flex flex-col items-center space-y-6 mb-8">
           <Skull size={100} className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
           <div>
             <h2 className="text-3xl font-black text-white uppercase">{name}</h2>
             <div className="bg-red-600 text-black font-bold px-4 py-1 inline-block -skew-x-12 mt-2">ERA IMPOSTOR</div>
           </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6 mb-8">
           <ShieldCheck size={100} className="text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]" />
           <div>
             <h2 className="text-3xl font-black text-white uppercase">{name}</h2>
             <div className="bg-blue-500 text-black font-bold px-4 py-1 inline-block -skew-x-12 mt-2">NO ERA IMPOSTOR</div>
           </div>
        </div>
      )}

      {/* --- BOTONES DE ACCIÓN --- */}
      <div className="w-full space-y-3 mt-4">

        {/* Solo permitimos continuar si NO es Game Over */}
        {!isGameOver && (
          <button
            className="btn btn-success btn-block btn-lg shadow-[0_0_15px_rgba(34,197,94,0.4)] border-none text-black font-black tracking-wider hover:scale-[1.02] transition-transform"
            onClick={onContinueGame}
          >
            <Play size={24} fill="black" /> CONTINUAR MISIÓN
          </button>
        )}

        <button
          className={`btn btn-block ${isGameOver ? 'btn-primary btn-lg' : 'btn-outline border-white/30 text-white hover:bg-white/10'}`}
          onClick={onShowResults}
        >
          {isGameOver ? 'Ver Informe Final' : 'Rendirse / Terminar'} <ChevronRight />
        </button>

      </div>

      {/* MENSAJES DE ESTADO DINÁMICOS */}

      {/* 1. Juego continúa */}
      {!isGameOver && isImpostor && (
         <p className="mt-4 text-xs text-green-500 font-mono">¡Buen trabajo! Pero aún hay infiltrados.</p>
      )}
      {!isGameOver && !isImpostor && (
         <p className="mt-4 text-xs text-red-400 font-mono">Cuidado. Los impostores siguen operando.</p>
      )}

      {/* 2. Juego Terminado: Ganan Ciudadanos */}
      {isGameOver && gameOverReason === 'impostors_dead' && (
         <p className="mt-4 text-xs text-primary font-bold font-mono animate-pulse">
           AMENAZA NEUTRALIZADA. INOCENTES GANAN.
         </p>
      )}

      {/* 3. Juego Terminado: Ganan Impostores (Dominación) */}
      {isGameOver && gameOverReason === 'impostors_domination' && (
         <div className="mt-4 space-y-1">
           <p className="text-xs text-red-500 font-bold font-mono animate-pulse">
             CRÍTICO: POBLACIÓN COMPROMETIDA.
           </p>
           <p className="text-[10px] text-red-400/60 font-mono">
             Los impostores han tomado el control.
           </p>
         </div>
      )}
    </>
  );
}
