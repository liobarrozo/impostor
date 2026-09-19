import { AlertTriangle, Radio } from 'lucide-react';
import Screen from '../components/ui/Screen';
import ExitButton from '../components/ui/ExitButton';
import CircularTimer from '../components/playing/CircularTimer';

export default function PlayingPage({ timer, category, onFinish, onExit }) {
  return (
    <Screen className="justify-between py-6 overflow-hidden">

      {/* 1. STATUS HEADER */}
      <div className="w-full px-4 flex justify-between items-center text-xs font-mono tracking-widest text-white/50 mb-4">
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           LIVE FEED
        </div>
        <div>SECURE CHANNEL</div>
      </div>

      {/* 2. TEMPORIZADOR CIRCULAR */}
      <CircularTimer timer={timer} />

      {/* 3. INFO DE LA MISIÓN */}
      <div className="w-full px-4 space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-20">
              <Radio size={40} />
           </div>
           <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Categoría de la Misión</p>
           <p className="text-2xl font-bold text-white">{category}</p>
        </div>

        {/* Botón de Acción Urgente */}
        <button
          onClick={onFinish}
          className="btn btn-error btn-outline btn-block btn-lg border-2 hover:bg-error hover:text-white group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-error/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="flex items-center gap-2 relative z-10 font-black tracking-widest">
            <AlertTriangle size={24} />
            IR A VOTAR
          </span>
        </button>

        <ExitButton onClick={onExit} />
      </div>
    </Screen>
  );
}
