import { UserRound } from 'lucide-react';

// Lista de sospechosos. Los eliminados quedan deshabilitados.
export default function VoteList({ playerNames, ejectedPlayers, onVote }) {
  return (
    <div className="flex-1 overflow-y-auto space-y-3 pb-20 scrollbar-hide">
      {playerNames.map((name, idx) => {
        const isDead = ejectedPlayers.includes(idx);
        return (
          <button
            key={idx}
            disabled={isDead}
            onClick={() => onVote(idx)}
            className={`w-full p-4 rounded-xl border flex items-center justify-between group transition-all
              ${isDead
                ? 'border-transparent bg-neutral-900 opacity-30 cursor-not-allowed grayscale'
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border border-white/10 bg-neutral-800">
                {idx + 1}
              </div>
              <span className="font-bold text-white tracking-wide text-lg">
                {name} {isDead && '(Eliminado)'}
              </span>
            </div>
            {!isDead && <UserRound className="text-white/20 group-hover:text-primary transition-colors" />}
          </button>
        )
      })}
    </div>
  );
}
