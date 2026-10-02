# GLITCHROOM

> **SOMETHING IS WRONG WITH THIS WEBSITE.**

GLITCHROOM is an interactive web experience in which the website itself is the character. It starts as a calm, minimal page. The more you interact, the more unstable it becomes, until the interface collapses and reveals a hidden series of rooms.

**By Teja Priyan**

**Live demo:** https://tejapriyan.github.io/GlitchRoom/

## Features
- A hidden glitch-level system that reacts to clicks, cursor movement, scrolling, hovering, resizing, idling and time, with six escalating phases
- Procedural glitch engine (displacement, RGB shift, tears, noise, scanlines, text corruption, duplication, melting, physics) with cooldowns and a flash-rate cap
- Eight rooms, each with its own mechanic: windows, a light-and-chase room, a patrol with roaming bots, a tone sequence, a lights puzzle, a rewind puzzle and an inverted-cursor finale
- Seven endings, a hidden terminal, hidden messages and secrets, and a New Game+ mode
- Progress saved locally (`localStorage`, key `gr`). No personal data is collected and nothing leaves your browser
- Procedural sound via the Web Audio API (no audio files), with an on/off toggle
- Mouse and touch support, with performance modes (HIGH, BALANCED, LOW) chosen automatically

## Controls
- Mouse or touch to interact. Press **ESC** at any time to close panels or exit to the landing page
- Open the **arrow at the bottom** for options: sound, reduced motion, high contrast, custom cursor, performance mode, assist mode, daily seed and the terminal

## Accessibility and safety
This experience contains flickering, flashing and inverted-colour effects. Flashes are rate-limited, and **Reduced Motion** (in the arrow menu) removes the rapid effects and heavy camera movement. High Contrast, a normal-cursor option and a sound toggle are also provided. Assist mode makes the puzzle rooms easier.

## Run locally
No build step and no dependencies. Serve the folder with any static server:

```bash
python3 -m http.server 8080   # then open http://localhost:8080
# or
npx serve .
```

## Deploy to GitHub Pages
1. Push this repository to GitHub (branch `main`).
2. Go to **Settings, then Pages, then Build and deployment, then Source: GitHub Actions**.
3. The included workflow (`.github/workflows/pages.yml`) deploys on every push to `main`.
4. Replace the demo URL above with your Pages URL.

## Project structure
```
index.html           markup
css/style.css        all styles
js/main.js           game logic, glitch engine, rooms, audio
.github/workflows/   GitHub Pages deployment
```

## License
Released under the [MIT License](LICENSE). Copyright (c) 2026 Teja Priyan.
