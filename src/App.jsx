import { useState, useEffect } from 'react';
import { useImpostorGame } from './hooks/useImpostorGame';

// --- PÁGINAS DEL JUEGO ---
import SetupPage from './pages/SetupPage';
import RevealPage from './pages/RevealPage';
import PlayingPage from './pages/PlayingPage';
import VotingPage from './pages/VotingPage';
import ResultPage from './pages/ResultPage';
import ExitConfirmModal from './components/ui/ExitConfirmModal';

export default function App() {
  // Estado para el modal de confirmación
  const [showExitModal, setShowExitModal] = useState(false);

  // Extraemos toda la lógica y datos de nuestro Custom Hook
  const {
    gameState,
    setGameState,
    config,
    setConfig,
    gameData,
    playerNames,      // Inputs crudos (para el Setup)
    updatePlayerName, // Función para editar nombres
    ejectedPlayers,   // Lista de eliminados
    startGame,
    nextPlayer,
    startVoting,      // Inicia la votación (Emergency Meeting)
    ejectPlayer,      // Marca un jugador como eliminado
    continuePlaying,  // Vuelve al juego si no se acabaron los impostores
    resetGame
  } = useImpostorGame();

  // Estados donde la partida está activa y no se debe permitir salida fácil
  const isGameActive = ['reveal', 'playing', 'voting'].includes(gameState);

  // Prevenir cierre accidental del navegador/pestaña
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isGameActive) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isGameActive]);

  const handleConfirmExit = () => {
    setShowExitModal(false);
    resetGame();
  };

  const openExitModal = () => setShowExitModal(true);

  return (
    // Contenedor Principal: Fondo negro y centrado para móviles
    <div className="min-h-screen bg-black text-neutral-content flex items-center justify-center font-sans overflow-hidden">

      {/* Contenedor ancho fijo para simular app móvil en escritorio
        y ocupar todo en celular
      */}
      <div className="w-full max-w-md min-h-screen relative">

        {/* Modal de Confirmación de Salida */}
        <ExitConfirmModal
          isOpen={showExitModal}
          onConfirm={handleConfirmExit}
          onCancel={() => setShowExitModal(false)}
        />

        {/* --- 1. CONFIGURACIÓN --- */}
        {gameState === 'setup' && (
          <SetupPage
            config={config}
            setConfig={setConfig}
            playerNames={playerNames}
            updatePlayerName={updatePlayerName}
            onStart={startGame}
          />
        )}

        {/* --- 2. REVELACIÓN DE ROLES (Pasar el celular) --- */}
        {gameState === 'reveal' && (
          <RevealPage
            // Usamos 'key' para forzar que el componente se reinicie al cambiar de jugador
            key={gameData.currentPlayerIndex}
            // Importante: Usamos activeNames (los procesados) no playerNames (los inputs)
            playerName={gameData.activeNames[gameData.currentPlayerIndex]}
            currentPlayer={gameData.currentPlayerIndex}
            totalPlayers={config.players}
            role={gameData.roles[gameData.currentPlayerIndex]}
            word={gameData.word}
            category={config.category}
            onNext={nextPlayer}
            onExit={openExitModal}
          />
        )}

        {/* --- 3. JUGANDO (Temporizador) --- */}
        {gameState === 'playing' && (
          <PlayingPage
            timer={gameData.timer}
            category={config.category}
            // El botón de emergencia lleva a la votación
            onFinish={startVoting}
            onExit={openExitModal}
          />
        )}

        {/* --- 4. VOTACIÓN (Emergency Meeting) --- */}
        {gameState === 'voting' && (
          <VotingPage
            playerNames={gameData.activeNames}
            roles={gameData.roles}
            ejectedPlayers={ejectedPlayers} // Para saber quiénes ya murieron
            onEject={ejectPlayer}           // Función para matar al seleccionado
            onContinueGame={continuePlaying} // Función para seguir si quedan impostores
            onShowResults={() => setGameState('result')} // Función para ir al final definitivo
            onExit={openExitModal}
          />
        )}

        {/* --- 5. RESULTADOS FINALES --- */}
        {gameState === 'result' && (
          <ResultPage
            word={gameData.word}
            roles={gameData.roles}
            playerNames={gameData.activeNames}
            ejectedPlayers={ejectedPlayers} // Necesario para calcular quién ganó
            onReset={resetGame}
          />
        )}

      </div>
    </div>
  );
}
