// src/App.jsx
import React from 'react';
import { useImpostorGame } from './hooks/useImpostorGame';

// Vistas
import SetupView from './components/views/SetupView';
import RevealView from './components/views/RevealView';
import PlayingView from './components/views/PlayingView';
import VotingView from './components/views/VotingView'; // 👈 Importar
import ResultView from './components/views/ResultView';

export default function App() {
  const { 
    gameState, 
    setGameState, 
    config, 
    setConfig, 
    gameData, 
    playerNames,
    updatePlayerName,
    startGame, 
    nextPlayer, 
    startVoting, // 👈 Usar la nueva función
    resetGame,
    ejectedPlayers, // 👈 Traemos esto
    ejectPlayer,    // 👈 Traemos esto
    continuePlaying // 👈 Traemos esto
  } = useImpostorGame();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-black`}> {/* Forzar fondo negro para estética */}
      
      {gameState === 'setup' && (
        <SetupView 
          config={config} 
          setConfig={setConfig} 
          playerNames={playerNames}
          updatePlayerName={updatePlayerName}
          onStart={startGame} 
        />
      )}

      {gameState === 'reveal' && (
        <RevealView 
          key={gameData.currentPlayerIndex}
          playerName={gameData.activeNames[gameData.currentPlayerIndex]}
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
          onFinish={startVoting} // 👈 Ahora llamamos a VOTACIÓN, no a resultados directos
        />
      )}

      {/* NUEVA VISTA DE VOTACIÓN */}
      {gameState === 'voting' && (
        <VotingView 
          playerNames={gameData.activeNames}
          roles={gameData.roles}
          ejectedPlayers={ejectedPlayers} // 👈 Pasamos lista de muertos
          onEject={ejectPlayer}           // 👈 Función para matar
          onContinueGame={continuePlaying} // 👈 Función para revivir el juego
          onShowResults={() => setGameState('result')} // Al terminar de votar, vamos al resultado global
        />
      )}

      {gameState === 'result' && (
        <ResultView 
          word={gameData.word}
          roles={gameData.roles}
          playerNames={gameData.activeNames}
          onReset={resetGame}
        />
      )}

    </div>
  );
}