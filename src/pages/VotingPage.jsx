import { useState } from 'react';
import { UserRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGameStatus } from '../utils/gameStatus';
import Screen from '../components/ui/Screen';
import ExitButton from '../components/ui/ExitButton';
import VoteList from '../components/voting/VoteList';
import EjectionResult from '../components/voting/EjectionResult';

export default function VotingPage({ playerNames, roles, ejectedPlayers, onEject, onContinueGame, onShowResults, onExit }) {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [votingStage, setVotingStage] = useState('selection'); // selection | ejecting | revealed

  const [status, setStatus] = useState(null);
  const isGameOver = status?.over ?? false;
  const gameOverReason = status?.reason ?? null;

  const handleVote = (index) => {
    setSelectedPlayerIndex(index);
    setVotingStage('ejecting');

    // 1. Ejecutamos la eliminación en el hook (estado global)
    onEject(index);

    // ejectedPlayers todavía no trae al recién votado en este render, lo sumamos a mano
    setStatus(getGameStatus(roles, [...ejectedPlayers, index]));

    setTimeout(() => {
      setVotingStage('revealed');
    }, 2500);
  };

  const isSelectedImpostor = selectedPlayerIndex !== null && roles[selectedPlayerIndex] === 'impostor';
  const selectedName = selectedPlayerIndex !== null ? playerNames[selectedPlayerIndex] : '';

  return (
    <Screen
      className="min-h-[85vh] py-6 overflow-hidden"
      tint={votingStage === 'revealed'
        ? (isSelectedImpostor ? 'bg-red-900 opacity-20' : 'bg-emerald-900 opacity-20')
        : ''}
    >

      <AnimatePresence mode='wait'>

        {/* --- FASE 1: SELECCIÓN --- */}
        {votingStage === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -100 }}
            className="w-full px-4 flex flex-col h-full"
          >
            <div className="text-center mb-6">
               <h2 className="text-2xl font-black text-white uppercase tracking-widest">¿Quién es el traidor?</h2>
            </div>

            <VoteList
              playerNames={playerNames}
              ejectedPlayers={ejectedPlayers}
              onVote={handleVote}
            />

            {/* Botón de Salir flotante al final */}
            <div className="absolute bottom-6 left-4 right-4">
              <ExitButton onClick={onExit} />
            </div>
          </motion.div>
        )}

        {/* --- FASE 2: ANIMACIÓN --- */}
        {votingStage === 'ejecting' && (
           <motion.div key="ejecting" className="flex flex-col items-center justify-center h-[60vh] text-center">
             <div className="relative w-32 h-32 mb-8">
               <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
               <UserRound size={48} className="text-white/50 animate-pulse absolute top-10 left-10" />
            </div>
            <h2 className="text-2xl font-black text-white">VERIFICANDO...</h2>
           </motion.div>
        )}

        {/* --- FASE 3: REVELACIÓN --- */}
        {votingStage === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center w-full px-4"
          >
            <EjectionResult
              name={selectedName}
              isImpostor={isSelectedImpostor}
              isGameOver={isGameOver}
              gameOverReason={gameOverReason}
              onContinueGame={onContinueGame}
              onShowResults={onShowResults}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </Screen>
  );
}
