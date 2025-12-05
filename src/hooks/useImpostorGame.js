// src/hooks/useImpostorGame.js
import { useState, useEffect } from 'react';
import { WORD_CATEGORIES } from '../constants/words';

export function useImpostorGame() {
  // --- ESTADOS PRINCIPALES ---
  const [gameState, setGameState] = useState('setup'); // setup, reveal, playing, voting, result
  
  // Lista de índices de jugadores que han sido eliminados/eyectados
  const [ejectedPlayers, setEjectedPlayers] = useState([]);

  // Nombres guardados en LocalStorage (Inputs del Setup)
  const [playerNames, setPlayerNames] = useState(() => {
    const saved = localStorage.getItem('impostorPlayers');
    // Si no hay nada, devolvemos un array de strings vacíos
    return saved ? JSON.parse(saved) : Array(12).fill('');
  });

  // Configuración de la partida
  const [config, setConfig] = useState({
    players: 4,
    impostors: 1,
    category: 'Animales'
  });
  
  // Datos volátiles de la partida actual
  const [gameData, setGameData] = useState({
    word: '',
    roles: [],
    activeNames: [], // Nombres procesados para la partida (con "Jugador X" si estaba vacío)
    currentPlayerIndex: 0,
    timer: 300 // 5 minutos por defecto
  });

  // --- EFECTOS ---

  // Guardar nombres en localStorage automáticamente
  useEffect(() => {
    localStorage.setItem('impostorPlayers', JSON.stringify(playerNames));
  }, [playerNames]);

  // Control del Temporizador (Solo corre en estado 'playing')
  useEffect(() => {
    let interval = null;
    if (gameState === 'playing' && gameData.timer > 0) {
      interval = setInterval(() => {
        setGameData(prev => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, gameData.timer]);


  // --- FUNCIONES DE ACCIÓN ---

  // Actualizar un nombre específico en el Setup
  const updatePlayerName = (index, newName) => {
    const newNames = [...playerNames];
    newNames[index] = newName;
    setPlayerNames(newNames);
  };

  // Iniciar una nueva partida
  const startGame = () => {
    // 1. Elegir palabra
    const words = WORD_CATEGORIES[config.category];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    // 2. Procesar nombres (Si está vacío, poner "Jugador X")
    const finalGameNames = Array.from({ length: config.players }).map((_, i) => {
      const name = playerNames[i];
      return (name && name.trim() !== '') ? name : `Jugador ${i + 1}`;
    });

    // 3. Asignar Roles
    let roles = Array(config.players).fill('citizen');
    let assigned = 0;
    while (assigned < config.impostors) {
      const idx = Math.floor(Math.random() * config.players);
      if (roles[idx] === 'citizen') {
        roles[idx] = 'impostor';
        assigned++;
      }
    }

    // 4. Resetear estados de juego
    setEjectedPlayers([]); // Nadie está eliminado al inicio
    setGameData({
      word: randomWord,
      roles: roles,
      activeNames: finalGameNames,
      currentPlayerIndex: 0,
      timer: 300
    });
    
    setGameState('reveal');
  };

  // Pasar al siguiente jugador durante la revelación
  const nextPlayer = () => {
    if (gameData.currentPlayerIndex + 1 < config.players) {
      setGameData(prev => ({ ...prev, currentPlayerIndex: prev.currentPlayerIndex + 1 }));
    } else {
      setGameState('playing');
    }
  };

  // Ir a la pantalla de votación (Emergency Meeting)
  const startVoting = () => {
    setGameState('voting');
  };

  // Marcar a un jugador como eliminado
  const ejectPlayer = (index) => {
    setEjectedPlayers(prev => [...prev, index]);
  };

  // Volver al juego (reaundar timer) tras una votación fallida
  const continuePlaying = () => {
    setGameState('playing');
  };

  // Reiniciar todo para jugar de nuevo (Setup)
  const resetGame = () => {
    setGameState('setup');
  };

  return {
    gameState,
    setGameState,
    config,
    setConfig,
    gameData,
    playerNames,
    ejectedPlayers,   // Exportado para VotingView
    updatePlayerName,
    startGame,
    nextPlayer,
    startVoting,
    ejectPlayer,      // Exportado para VotingView
    continuePlaying,  // Exportado para VotingView
    resetGame
  };
}