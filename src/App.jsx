import React from 'react';
import { useImpostorGame } from './hooks/useImpostorGame';

// --- VISTAS DEL JUEGO ---
import SetupView from './components/views/SetupView';
import RevealView from './components/views/RevealView';
import PlayingView from './components/views/PlayingView';
import VotingView from './components/views/VotingView';
import ResultView from './components/views/ResultView';

export default function App() {
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

  return (
    // Contenedor Principal: Fondo negro y centrado para móviles
    <div className="min-h-screen bg-black text-neutral-content flex items-center justify-center font-sans overflow-hidden">
      
      {/* Contenedor ancho fijo para simular app móvil en escritorio 
        y ocupar todo en celular 
      */}
      <div className="w-full max-w-md min-h-screen relative">
        
        {/* --- 1. CONFIGURACIÓN --- */}
        {gameState === 'setup' && (
          <SetupView 
            config={config} 
            setConfig={setConfig} 
            playerNames={playerNames}
            updatePlayerName={updatePlayerName}
            onStart={startGame} 
          />
        )}

        {/* --- 2. REVELACIÓN DE ROLES (Pasar el celular) --- */}
        {gameState === 'reveal' && (
          <RevealView 
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
          />
        )}

        {/* --- 3. JUGANDO (Temporizador) --- */}
        {gameState === 'playing' && (
          <PlayingView 
            timer={gameData.timer}
            category={config.category}
            // El botón de emergencia lleva a la votación
            onFinish={startVoting} 
          />
        )}

        {/* --- 4. VOTACIÓN (Emergency Meeting) --- */}
        {gameState === 'voting' && (
          <VotingView 
            playerNames={gameData.activeNames}
            roles={gameData.roles}
            ejectedPlayers={ejectedPlayers} // Para saber quiénes ya murieron
            onEject={ejectPlayer}           // Función para matar al seleccionado
            onContinueGame={continuePlaying} // Función para seguir si quedan impostores
            onShowResults={() => setGameState('result')} // Función para ir al final definitivo
          />
        )}

        {/* --- 5. RESULTADOS FINALES --- */}
        {gameState === 'result' && (
          <ResultView 
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