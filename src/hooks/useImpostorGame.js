// src/hooks/useImpostorGame.js
import { useState, useEffect } from 'react';
import { WORD_CATEGORIES } from '../constants/words';

export function useImpostorGame() {
  // --- ESTADOS PRINCIPALES ---
  const [gameState, setGameState] = useState('setup'); 
  const [ejectedPlayers, setEjectedPlayers] = useState([]);

  // Nombres guardados
  const [playerNames, setPlayerNames] = useState(() => {
    const saved = localStorage.getItem('impostorPlayers');
    return saved ? JSON.parse(saved) : Array(12).fill('');
  });

  // 👇 1. NUEVO ESTADO: Historial de palabras recientes
  const [recentWords, setRecentWords] = useState(() => {
    const saved = localStorage.getItem('impostorWordHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [config, setConfig] = useState({
    players: 4,
    impostors: 1,
    category: 'Animales' // Valor por defecto
  });
  
  const [gameData, setGameData] = useState({
    word: '',
    roles: [],
    activeNames: [],
    currentPlayerIndex: 0,
    timer: 300
  });

  // --- EFECTOS ---

  useEffect(() => {
    localStorage.setItem('impostorPlayers', JSON.stringify(playerNames));
  }, [playerNames]);

  // 👇 2. NUEVO EFFECT: Guardar historial de palabras en LocalStorage
  useEffect(() => {
    localStorage.setItem('impostorWordHistory', JSON.stringify(recentWords));
  }, [recentWords]);

  useEffect(() => {
    let interval = null;
    if (gameState === 'playing' && gameData.timer > 0) {
      interval = setInterval(() => {
        setGameData(prev => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, gameData.timer]);


  // --- FUNCIONES ---

  const updatePlayerName = (index, newName) => {
    const newNames = [...playerNames];
    newNames[index] = newName;
    setPlayerNames(newNames);
  };

  const startGame = () => {
    // 👇 3. LÓGICA DE SELECCIÓN SIN REPETIDOS
    const allWordsInCategory = WORD_CATEGORIES[config.category];

    // Filtramos las palabras: Dejamos solo las que NO están en recentWords
    const availableWords = allWordsInCategory.filter(word => !recentWords.includes(word));

    // Fallback de seguridad: Si por alguna razón filtramos todas (ej: categoría muy chica),
    // usamos todas las palabras de nuevo para no romper el juego.
    const selectionPool = availableWords.length > 0 ? availableWords : allWordsInCategory;

    // Elegimos al azar del pool filtrado
    const randomWord = selectionPool[Math.floor(Math.random() * selectionPool.length)];

    // Actualizamos el historial
    setRecentWords(prevHistory => {
      const newHistory = [...prevHistory, randomWord];
      // Si tenemos más de 3, sacamos la primera (la más vieja)
      if (newHistory.length > 3) {
        newHistory.shift();
      }
      return newHistory;
    });
    
    // --- FIN LÓGICA PALABRA ---

    // Procesar nombres
    const finalGameNames = Array.from({ length: config.players }).map((_, i) => {
      const name = playerNames[i];
      return (name && name.trim() !== '') ? name : `Jugador ${i + 1}`;
    });

    // Asignar Roles
    let roles = Array(config.players).fill('citizen');
    let assigned = 0;
    while (assigned < config.impostors) {
      const idx = Math.floor(Math.random() * config.players);
      if (roles[idx] === 'citizen') {
        roles[idx] = 'impostor';
        assigned++;
      }
    }

    setEjectedPlayers([]); 
    setGameData({
      word: randomWord,
      roles: roles,
      activeNames: finalGameNames,
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

  const startVoting = () => setGameState('voting');
  const ejectPlayer = (index) => setEjectedPlayers(prev => [...prev, index]);
  const continuePlaying = () => setGameState('playing');
  const resetGame = () => setGameState('setup');

  return {
    gameState,
    setGameState,
    config,
    setConfig,
    gameData,
    playerNames,
    ejectedPlayers,
    updatePlayerName,
    startGame,
    nextPlayer,
    startVoting,
    ejectPlayer,
    continuePlaying,
    resetGame
  };
}