// node src/utils/gameStatus.check.mjs
import assert from 'node:assert';
import { getGameStatus } from './gameStatus.js';

const I = 'impostor';
const C = 'citizen';

// Partida en curso: 1 infiltrado contra 3, nadie eliminado.
assert.deepStrictEqual(getGameStatus([I, C, C, C], []), {
  over: false,
  impostorsWon: true,
  reason: null,
});

// Cae el infiltrado: ganan los inocentes.
assert.deepStrictEqual(getGameStatus([I, C, C, C], [0]), {
  over: true,
  impostorsWon: false,
  reason: 'impostors_dead',
});

// Queda 1 contra 1: los infiltrados dominan.
assert.deepStrictEqual(getGameStatus([I, C, C, C], [1, 2]), {
  over: true,
  impostorsWon: true,
  reason: 'impostors_domination',
});

// Dos infiltrados, cae uno: la partida sigue.
assert.strictEqual(getGameStatus([I, I, C, C, C], [0]).over, false);

// Dos infiltrados vivos contra dos inocentes: dominan.
assert.strictEqual(getGameStatus([I, I, C, C, C], [2]).reason, 'impostors_domination');

console.log('gameStatus OK');
