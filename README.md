# Infiltrado

Juego de fiesta local (tipo "impostor") para jugar pasando un solo celular. Todos ven una palabra secreta menos los infiltrados, que tienen que disimular.

PWA instalable, en español, pensada para pantalla de móvil.

## Cómo jugar

1. **Setup** — elegís cantidad de jugadores, cuántos infiltrados y la categoría. Los nombres quedan guardados en `localStorage`.
2. **Reveal** — el celular pasa de mano en mano: cada jugador ve su rol y la palabra (o que es infiltrado).
3. **Playing** — temporizador de 5 min mientras se habla. Botón de reunión de emergencia para cortar antes.
4. **Voting** — se expulsa a un jugador por ronda. Si quedan infiltrados vivos, se vuelve a jugar.
5. **Result** — se muestra la palabra, los roles y quién ganó.

Gana la tripulación si expulsa a todos los infiltrados; ganan los infiltrados si igualan o superan en número a los vivos.

## Stack

React 19 · Vite 7 · Tailwind 4 + daisyUI · framer-motion · lucide-react · vite-plugin-pwa · Vercel Analytics

## Comandos

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run preview  # previsualizar el build
npm run lint     # eslint
```

## Estructura

```
src/
├── App.jsx                     # router por gameState (setup/reveal/playing/voting/result)
├── main.jsx
├── index.css
├── hooks/
│   └── useImpostorGame.js      # toda la lógica: roles, palabra, timer, expulsiones
├── components/
│   ├── ExitConfirmModal.jsx
│   └── views/                  # SetupView, RevealView, PlayingView, VotingView, ResultView
├── constants/
│   └── words.js                # WORD_CATEGORIES
└── utils/
    ├── gameStatus.js           # única fuente de verdad de quién gana
    └── gameStatus.check.mjs    # self-check: node src/utils/gameStatus.check.mjs
```

## Detalles

- **Sin repetidos**: las últimas 3 palabras usadas se guardan en `localStorage` y se excluyen del sorteo.
- **Salida protegida**: con la partida en curso hay modal de confirmación y `beforeunload`.
- Agregar categorías = agregar una clave más en `src/constants/words.js`.
