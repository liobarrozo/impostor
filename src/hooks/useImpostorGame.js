// src/hooks/useImpostorGame.js
import { useState, useEffect } from 'react';
import { WORD_CATEGORIES } from '../constants/words';

export function useImpostorGame() {
  const [gameState, setGameState] = useState('setup');
  
  // 1. Cargar nombres guardados o crear valores por defecto
  const [playerNames, setPlayerNames] = useState(() => {
    const saved = localStorage.getItem('impostorPlayers');
    const initial = saved ? JSON.parse(saved) : [];
    // Rellenamos hasta 12 huecos por defecto por si acaso
    return Array.from({ length: 12 }, (_, i) => initial[i] || `Jugador ${i + 1}`);
  });

  const [config, setConfig] = useState({
    players: 4,
    impostors: 1,
    category: 'Animales'
  });
  
  const [gameData, setGameData] = useState({
    word: '',
    roles: [],
    currentPlayerIndex: 0,
    timer: 300
  });

  // 2. Guardar en localStorage cada vez que cambien los nombres
  useEffect(() => {
    localStorage.setItem('impostorPlayers', JSON.stringify(playerNames));
  }, [playerNames]);

  // Función para cambiar un nombre específico
  const updatePlayerName = (index, newName) => {
    const newNames = [...playerNames];
    newNames[index] = newName;
    setPlayerNames(newNames);
  };

  const startGame = () => {
    const words = WORD_CATEGORIES[config.category];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
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

  const nextPlayer = () => {
    if (gameData.currentPlayerIndex + 1 < config.players) {
      setGameData(prev => ({ ...prev, currentPlayerIndex: prev.currentPlayerIndex + 1 }));
    } else {
      setGameState('playing');
    }
  };

  const resetGame = () => {
    setGameState('setup');
  };

  // Timer logic...
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
    playerNames,      // Exportamos los nombres
    updatePlayerName, // Exportamos la función para editarlos
    startGame,
    nextPlayer,
    resetGame
  };
}