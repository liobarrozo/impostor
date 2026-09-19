import { Skull, ShieldCheck } from 'lucide-react';

// Quién ganó, en grande.
export default function VerdictHeader({ impostorsWon }) {
  const ThemeIcon = impostorsWon ? Skull : ShieldCheck;

  return (
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
  );
}
