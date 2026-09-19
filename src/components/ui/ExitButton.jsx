import { Home } from 'lucide-react';

// "Abandonar Operación": estaba copiado igual en Reveal, Playing y Voting.
export default function ExitButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-outline btn-sm w-full border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-500 transition-colors ${className}`}
    >
      <Home size={16} />
      Abandonar Operación
    </button>
  );
}
