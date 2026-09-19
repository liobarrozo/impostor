import { Trophy } from 'lucide-react';

// Desglose final: rol, si cayó y si estaba en el bando ganador.
export default function AgentReport({ roles, playerNames, ejectedPlayers, impostorsWon }) {
  return (
    <div className="w-full flex-1 overflow-y-auto space-y-3 mb-6 pr-1 scrollbar-hide">
      <div className="text-xs text-white/30 font-mono uppercase tracking-widest mb-2 text-center">Informe de Agentes</div>

      {roles.map((role, idx) => {
        const isDead = ejectedPlayers.includes(idx);
        const isImpostor = role === 'impostor';
        const isWinner = impostorsWon === isImpostor;

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
                <Trophy size={14} className="text-amber-400" />
             )}
          </div>
        )
      })}
    </div>
  );
}
