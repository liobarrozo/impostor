// src/hooks/useImpostorGame.js
import { useState, useEffect } from 'react';
import { WORD_CATEGORIES } from '../constants/words';

export function useImpostorGame() {
  const [gameState, setGameState] = useState('setup'); // setup, reveal, playing, result
  const [config, setConfig] = useState({
    players: 4,
    impostors: 1,
    category: 'Animales'
  });
  
  const [gameData, setGameData] = useState({
    word: '',
    roles: [], // ['citizen', 'impostor', ...]
    currentPlayerIndex: 0,
    timer: 300
  });

  // Iniciar el juego
  const startGame = () => {
    const words = WORD_CATEGORIES[config.category];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    // Crear roles
    let roles = Array(config.players).fill('citizen');
    let assigned = 0;
    while (assigned < config.impostors) {
      const idx = Math.floor(Math.random() * config.players);
      if (roles[idx] === 'citizen') {
        roles[idx] = 'impostor';
        assigned++;
      }
    }

    setGameData({
      word: randomWord,
      roles: roles,
      currentPlayerIndex: 0,
      timer: 300
    });
    setGameState('reveal');
  };

  // Pasar al siguiente jugador
  const nextPlayer = () => {
    if (gameData.currentPlayerIndex + 1 < config.players) {
      setGameData(prev => ({ ...prev, currentPlayerIndex: prev.currentPlayerIndex + 1 }));
    } else {
      setGameState('playing');
    }
  };

  // Reiniciar
  const resetGame = () => {
    setGameState('setup');
  };

  // Control del Timer
  useEffect(() => {
    let interval = null;
    if (gameState === 'playing' && gameData.timer > 0) {
      interval = setInterval(() => {
        setGameData(prev => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, gameData.timer]);

  return {
    gameState,
    setGameState,
    config,
    setConfig,
    gameData,
    startGame,
    nextPlayer,
    resetGame
  };
}