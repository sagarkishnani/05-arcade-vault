# SPEC 01 — MVP Visual Arcade Vault

> **Status:** Implementado
> **Depends on:** —
> **Date:** 2026-06-29
> **Objective:** Implementar todas las pantallas visuales de Arcade Vault (Biblioteca, Detalle, Reproductor, Auth, Salón de la Fama) en Next.js App Router con rutas reales, sin juegos funcionales ni backend real.

## Scope

**In:**

- Nav global con logo, links, contador de créditos, botón auth y menú hamburguesa mobile.
- Página `/` — Biblioteca: hero, búsqueda, filtros por categoría, grid de tarjetas con efecto tilt.
- Página `/detalle/[id]` — Detalle del juego: cover, info, stats, botones de acción, leaderboard lateral.
- Página `/player/[id]` — Reproductor: HUD, pantalla CRT con animación CSS, score simulado con setInterval, overlay de pausa, modal de fin de partida.
- Página `/auth` — Login/registro: tabs, formulario, botones de auth social (solo visual), opción invitado.
- Página `/salon` — Salón de la Fama: tabs por juego, podio top 3, tabla completa de scores.
- Footer global con copyright.
- Sistema CSS del template (`styles.css`) portado a `app/globals.css`.
- Datos mock estáticos (GAMES, CATS, seededScores) en un archivo `lib/data.ts`.
- Auth simulada: formulario guarda `{ name }` en localStorage; sin backend.
- Estado de usuario compartido vía React Context en el root layout.

**Out of scope (para specs futuros):**

- Juegos reales (lógica de juego, canvas, controles).
- Backend, base de datos o API real.
- Autenticación real (Google, GitHub u OAuth).
- Persistencia de scores en servidor.
- Internacionalización o soporte multilenguaje.
- Tests automatizados.

## Data model

```ts
// lib/data.ts

export type Game = {
  id: string;
  title: string;
  short: string;
  long: string;
  cat: "ARCADE" | "PUZZLE" | "SHOOTER" | "VERSUS";
  cover: string;       // CSS class name, e.g. "cover-bricks"
  color: "cyan" | "magenta" | "yellow" | "green";
  best: number;
  plays: string;
};

export type ScoreRow = {
  rank: number;
  name: string;
  score: number;
  date: string;        // "DD/MM/YYYY"
};

export type User = {
  name: string;        // max 10 chars, uppercase
};
```

// lib/data.ts también exporta:
// - GAMES: Game[]           — 8 juegos mock
// - CATS: string[]          — ["TODOS","ARCADE","PUZZLE","SHOOTER","VERSUS"]
// - seededScores(seed, count): ScoreRow[]  — generador determinista

// context/UserContext.tsx
// UserContext provee: user: User | null, login(u: User), signOut()
// Persiste en localStorage bajo la key "av_user"

Esta feature no introduce base de datos ni esquema de servidor. Todo el estado es en memoria o localStorage.

## Implementation plan

1. Portar `styles.css` del template a `app/globals.css` (añadir al final, sin tocar las variables existentes de Next.js).

2. Crear `lib/data.ts` con los tipos `Game`, `ScoreRow`, `User`, las constantes `GAMES`, `CATS`, y la función `seededScores`.

3. Crear `context/UserContext.tsx` con el provider de usuario (login/signOut, persistencia en localStorage `av_user`).

4. Actualizar `app/layout.tsx`: envolver con `UserContextProvider`, añadir `<Nav>` y `<footer>` globales, añadir las fuentes "Press Start 2P" y "JetBrains Mono" vía `next/font/google`.

5. Crear `components/Nav.tsx` — barra de navegación con logo, links, contador de créditos, botón auth, menú hamburguesa mobile.

6. Crear `app/page.tsx` — pantalla Biblioteca: hero, búsqueda, chips de categoría, grid de `<GameCard>` con efecto tilt.

7. Crear `app/detalle/[id]/page.tsx` — pantalla Detalle: cover, info, stats strip, botones de acción, leaderboard lateral.

8. Crear `app/player/[id]/page.tsx` — pantalla Reproductor: HUD, CRT con animación CSS, score simulado vía `setInterval`, overlay de pausa, modal de fin de partida con guardado en localStorage (`av_scores`).

9. Crear `app/auth/page.tsx` — pantalla Auth: tabs login/registro, formulario, botones sociales (solo visual), botón de invitado.

10. Crear `app/salon/page.tsx` — pantalla Salón de la Fama: tabs por juego, podio top 3, tabla completa, fila destacada del usuario autenticado.

## Acceptance criteria

- [ ] La app carga en `/` sin errores en consola y muestra el hero y el grid de 8 juegos.
- [ ] El buscador filtra juegos por nombre en tiempo real.
- [ ] Los chips de categoría filtran el grid correctamente; "TODOS" muestra los 8 juegos.
- [ ] Hacer clic en una tarjeta o en "JUGAR" navega a `/detalle/[id]`.
- [ ] La página de detalle muestra el cover, descripción larga, stats y el leaderboard lateral con 10 filas.
- [ ] "JUGAR AHORA" desde detalle navega a `/player/[id]`.
- [ ] En el reproductor el score incrementa automáticamente mientras no esté en pausa ni haya fin de partida.
- [ ] El botón "PAUSA" detiene el score y muestra el overlay; "REANUDAR" lo reactiva.
- [ ] "FIN" muestra el modal con la puntuación final y el campo de iniciales.
- [ ] "GUARDAR PUNTUACIÓN" guarda la entrada en localStorage bajo `av_scores` y muestra la confirmación.
- [ ] La página `/auth` alterna entre tabs "INICIAR SESIÓN" y "CREAR CUENTA"; el campo de correo aparece solo en registro.
- [ ] Completar el formulario de auth guarda el usuario en localStorage y redirige a `/`.
- [ ] "JUGAR COMO INVITADO" redirige a `/` sin guardar usuario.
- [ ] La página `/salon` muestra tabs para los 8 juegos y el podio cambia al cambiar de tab.
- [ ] Si hay usuario autenticado, el Salón muestra su fila resaltada en amarillo al final de la tabla.
- [ ] El Nav muestra el nombre del usuario cuando está autenticado y el botón "Iniciar Sesión" cuando no.
- [ ] El menú hamburguesa mobile aparece y se cierra correctamente.
- [ ] La navegación hacia atrás ("VOLVER AL VAULT") funciona en detalle y salón.

## Decisions

- **Sí:** Rutas reales de App Router (`/`, `/detalle/[id]`, `/player/[id]`, `/auth`, `/salon`).
  Motivo: URLs limpias, deep-linking nativo, más escalable que hash routing.

- **No:** Hash routing en una sola página como el template original.
  Motivo: no aprovecha App Router y dificulta añadir SSR o fetch de datos en el futuro.

- **Sí:** CSS del template portado a `globals.css` sin reescribir en Tailwind.
  Motivo: los efectos retro (scanlines, grid perspectiva, neón) no tienen utilidades 1:1 en Tailwind v4;
  reescribirlos añadiría trabajo sin ganancia visual.

- **No:** Reescribir los estilos en Tailwind v4.
  Motivo: riesgo alto de pérdida de fidelidad visual en un MVP puramente visual.

- **Sí:** Auth simulada con localStorage. Sin backend ni OAuth real.
  Motivo: MVP visual; la autenticación real va en un spec futuro.

- **Sí:** Score simulado con `setInterval` en el reproductor. Sin lógica de juego.
  Motivo: el objetivo es la pantalla visual del reproductor, no el juego en sí.

- **Sí:** Datos mock en `lib/data.ts` (TypeScript). Sin API ni base de datos.
  Motivo: suficiente para el MVP; la integración con backend va en un spec futuro.

- **Sí:** Estado de usuario compartido vía React Context en el root layout.
  Motivo: el Nav y el Salón necesitan acceder al usuario; Context evita prop-drilling entre rutas.

## Qué NO está en este spec

- Juegos reales (lógica, canvas, controles de teclado/táctil).
- Backend, base de datos o API real de ningún tipo.
- Autenticación real con Google, GitHub u OAuth.
- Persistencia de scores en servidor.
- Tests automatizados (unitarios, de integración o E2E).
- Internacionalización o soporte multilenguaje.

Cada uno de estos, si llega, va en su propio spec.
