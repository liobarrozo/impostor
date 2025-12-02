import React from 'react';
import { useImpostorGame } from './hooks/useImpostorGame';

// Vistas
import SetupView from './components/views/SetupView';
import RevealView from './components/views/RevealView';
import PlayingView from './components/views/PlayingView';
import ResultView from './components/views/ResultView';

export default function App() {
  const { 
    gameState, 
    setGameState, 
    config, 
    setConfig, 
    gameData, 
    startGame, 
    nextPlayer, 
    resetGame 
  } = useImpostorGame();

  // Contenedor principal centrado
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${gameState === 'reveal' ? 'bg-neutral' : 'bg-base-200'}`}>
      
      {gameState === 'setup' && (
        <SetupView 
          config={config} 
          setConfig={setConfig} 
          onStart={startGame} 
        />
      )}

      {gameState === 'reveal' && (
        <RevealView 
          // Usamos 'key' para forzar que React reinicie el componente (y su estado interno) cuando cambia el jugador
          key={gameData.currentPlayerIndex}
          currentPlayer={gameData.currentPlayerIndex}
          totalPlayers={config.players}
          role={gameData.roles[gameData.currentPlayerIndex]}
          word={gameData.word}
          category={config.category}
          onNext={nextPlayer}
        />
      )}

      {gameState === 'playing' && (
        <PlayingView 
          timer={gameData.timer}
          category={config.category}
          onFinish={() => setGameState('result')}
        />
      )}

      {gameState === 'result' && (
        <ResultView 
          word={gameData.word}
          roles={gameData.roles}
          onReset={resetGame}
        />
      )}

    </div>
  );
}