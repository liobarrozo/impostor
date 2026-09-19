import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const MAX_TIME = 300; // 5 minutos
const RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Cuenta regresiva circular. Solo dibuja: el tiempo lo maneja el hook del juego.
export default function CircularTimer({ timer }) {
  const percentage = (timer / MAX_TIME) * 100;
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  // Formato MM:SS
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // Alerta de poco tiempo (< 1 min)
  const isUrgent = timer < 60;

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <div className="relative w-72 h-72">
         <svg className="w-full h-full transform -rotate-90">
           {/* Círculo fondo */}
           <circle
             cx="50%" cy="50%" r={RADIUS}
             stroke="currentColor" strokeWidth="8" fill="transparent"
             className="text-white/5"
           />
           {/* Círculo progreso */}
           <circle
             cx="50%" cy="50%" r={RADIUS}
             stroke="currentColor" strokeWidth="8" fill="transparent"
             strokeDasharray={CIRCUMFERENCE}
             strokeDashoffset={strokeDashoffset}
             strokeLinecap="round"
             className={`transition-all duration-1000 ${isUrgent ? 'text-red-500' : 'text-primary'}`}
           />
         </svg>

         {/* Texto central */}
         <div className="absolute inset-0 flex flex-col items-center justify-center">
           <motion.div
             key={timer}
             initial={{ scale: 0.9, opacity: 0.8 }}
             animate={{ scale: 1, opacity: 1 }}
             className={`text-6xl font-black font-mono tracking-tighter ${isUrgent ? 'text-red-500 animate-pulse' : 'text-white'}`}
           >
             {timeString}
           </motion.div>
           <div className="flex items-center gap-1 text-white/40 text-xs font-mono mt-2 uppercase tracking-widest">
              <Timer size={12} /> Tiempo Restante
           </div>
         </div>
      </div>
    </div>
  );
}
