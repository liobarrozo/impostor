import { useState } from 'react';
import { ChevronRight, Lock } from 'lucide-react';
import Screen from '../components/ui/Screen';
import ExitButton from '../components/ui/ExitButton';
import RoleCard from '../components/reveal/RoleCard';

export default function RevealPage({ playerName, currentPlayer, totalPlayers, role, word, category, onNext, onExit }) {
  const [hasSeenRole, setHasSeenRole] = useState(false);

  return (
    <Screen className="justify-between py-6 overflow-x-hidden">

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
      <RoleCard
        role={role}
        word={word}
        category={category}
        onReveal={() => setHasSeenRole(true)}
      />

      {/* 3. FOOTER / ACCIONES */}
      <div className="w-full px-6 mt-4 relative z-10 space-y-3">
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
        <ExitButton onClick={onExit} />
      </div>

    </Screen>
  );
}
