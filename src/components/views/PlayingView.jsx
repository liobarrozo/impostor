// src/components/views/PlayingView.jsx
import React from 'react';
import { Timer, AlertTriangle, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlayingView({ timer, category, onFinish }) {
  // Cálculos para el círculo SVG
  const maxTime = 300; // 5 minutos
  const percentage = (timer / maxTime) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Formato MM:SS
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // Alerta de poco tiempo (< 1 min)
  const isUrgent = timer < 60;

  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh] w-full max-w-sm py-6 overflow-hidden relative">
      
      {/* Fondo Táctico */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black -z-10"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] -z-10"></div>

      {/* 1. STATUS HEADER */}
      <div className="w-full px-4 flex justify-between items-center text-xs font-mono tracking-widest text-white/50 mb-4">
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           LIVE FEED
        </div>
        <div>SECURE CHANNEL</div>
      </div>

      {/* 2. TEMPORIZADOR CIRCULAR */}
      <div className="relative flex flex-col items-center justify-center py-8">
        {/* SVG Circle */}
        <div className="relative w-72 h-72">
           {/* Círculo fondo */}
           <svg className="w-full h-full transform -rotate-90">
             <circle
               cx="50%" cy="50%" r={radius}
               stroke="currentColor" strokeWidth="8" fill="transparent"
               className="text-white/5"
             />
             {/* Círculo progreso */}
             <circle
               cx="50%" cy="50%" r={radius}
               stroke="currentColor" strokeWidth="8" fill="transparent"
               strokeDasharray={circumference}
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
            EMERGENCY MEETING
          </span>
        </button>
      </div>
    </div>
  );
}