import { Play, ScanLine } from 'lucide-react';
import Screen from '../components/ui/Screen';
import InstallAppButton from '../components/setup/InstallAppButton';
import MissionParams from '../components/setup/MissionParams';
import PlayerRoster from '../components/setup/PlayerRoster';

export default function SetupPage({ config, setConfig, playerNames, updatePlayerName, onStart }) {
  return (
    <Screen className="py-4">

      {/* --- LOGO COMPACTO --- */}
      <div className="flex flex-col items-center mb-6 relative z-10 w-full shrink-0">
         <div className="text-[10px] text-primary/40 font-mono mb-1 tracking-[0.5em] flex items-center gap-2">
            <ScanLine size={10} /> SECURE LINK
         </div>
         <div className="relative">
            <h1 className="relative text-5xl font-black italic tracking-tighter text-white transform -skew-x-6 drop-shadow-lg">
               INFILTRADO<span className="text-primary">.</span>
            </h1>
         </div>
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4"></div>
      </div>

      {/* --- AREA DE SCROLL --- */}
      <div className="w-full flex-1 min-h-0 px-4 pb-32 overflow-y-auto scrollbar-hide">
        <InstallAppButton />
        <MissionParams config={config} setConfig={setConfig} />
        <PlayerRoster
          playerCount={config.players}
          playerNames={playerNames}
          updatePlayerName={updatePlayerName}
        />
      </div>

      {/* --- FOOTER FLOTANTE (BOTÓN START) --- */}
      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 pt-12 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none flex justify-center z-50">
         <button
           className="btn btn-primary btn-block btn-lg shadow-[0_0_30px_rgba(0,255,0,0.2)] border-none text-black font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all pointer-events-auto relative overflow-hidden group max-w-sm"
           onClick={onStart}
         >
           <div className="absolute top-0 -left-full w-full h-full bg-white/40 -skew-x-12 group-hover:animate-[shimmer_1s_infinite]"></div>
           <div className="flex items-center gap-3 relative z-10">
             <Play size={20} fill="black" />
             INICIAR OPERACIÓN
           </div>
         </button>
      </div>

    </Screen>
  );
}
