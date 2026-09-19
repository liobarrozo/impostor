import { AlertCircle, AlertTriangle, Home, RotateCw } from 'lucide-react';

export default function ExitConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-gradient-to-br from-slate-900 to-black border border-red-500/30 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">

        {/* Icono y Título */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-red-900/20 rounded-full mb-4 border border-red-500/30">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-white text-center">¿ABANDONAR OPERACIÓN?</h2>
        </div>

        {/* Mensaje */}
        <p className="text-center text-white/70 mb-8 text-sm leading-relaxed">
          La partida está en curso. Si sales ahora, perderás todo el progreso.
          <br />
          <span className="text-red-400 font-bold inline-flex items-center gap-1"><AlertTriangle size={14} /> Esta acción no se puede deshacer</span>
        </p>

        {/* Botones */}
        <div className="flex flex-col gap-3">
          {/* Botón Principal - Continuar */}
          <button
            onClick={onCancel}
            className="btn btn-block btn-lg bg-white text-black border-0 font-bold hover:bg-gray-200 transition-all shadow-lg"
          >
            <RotateCw size={20} />
            Continuar Operación
          </button>

          {/* Botón Secundario - Salir */}
          <button
            onClick={onConfirm}
            className="btn btn-outline btn-sm btn-block border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-500 transition-all"
          >
            <Home size={16} />
            Salir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
