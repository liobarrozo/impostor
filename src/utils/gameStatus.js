// Única fuente de verdad sobre quién gana. La usan VotingPage (¿sigue la partida?)
// y ResultPage (¿quién ganó?), que antes lo calculaban por separado y podían discrepar.
export function getGameStatus(roles, deadIndexes) {
  const alive = roles.filter((_, i) => !deadIndexes.includes(i));
  const impostors = alive.filter(role => role === 'impostor').length;
  const citizens = alive.length - impostors;

  const over = impostors === 0 || impostors >= citizens;

  return {
    over,
    // Vale también al rendirse a mitad de partida: si queda un infiltrado vivo, ganan ellos.
    impostorsWon: impostors > 0,
    reason: !over ? null : impostors === 0 ? 'impostors_dead' : 'impostors_domination',
  };
}
