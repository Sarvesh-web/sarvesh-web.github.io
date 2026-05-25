# SARVESH.exe — Operator HUD

A gamified personal portfolio for **Sarvesh Yenarkar** — Game / Simulation Engineer — built as a tactical sci-fi loadout screen. Resume content is modeled as game data: projects become weapons in an arsenal, jobs become missions on a timeline, skills become nodes on an upgrade tree, and contact details live in a comms terminal.

> Aesthetic anchor: military-spec HUD with corner brackets, scanlines, mono telemetry, and a single committed signature color — accent orange `#ff6a35`. Inspired by tactical loadout UIs (think *Starfield* / *Cyberpunk* gear screens, *DOOM Eternal* HUD, mil-sim radar overlays).

---

## Stack

- **React 19** + **TypeScript 5**
- **Vite 6** (dev server, build, fast HMR)
- **Tailwind CSS 3** with a custom `hud-*` design-token palette
- **Framer Motion** for entrance / page transitions
- **Lucide React** for iconography
- No backend — every screen reads from a single typed data file: `src/data/profile.ts`

## Quick start

```bash
npm install
npm run dev     # http://localhost:5173 (auto-opens)
npm run build   # type-check + production bundle to /dist
npm run preview # serve the production build locally
npm run lint    # ESLint
```

## Project layout

```
src/
├── App.tsx                       # screen router + global keyboard / a11y wiring
├── main.tsx                      # React 19 entry
├── styles/index.css              # Tailwind layers + HUD primitives + CRT overlays
├── data/profile.ts               # ALL portfolio content (single source of truth)
├── hooks/
│   └── useKonami.ts              # ↑↑↓↓←→←→BA easter egg listener
└── components/
    ├── hud/                      # reusable HUD primitives
    │   ├── Bracket.tsx           # corner brackets
    │   ├── HUDPanel.tsx          # panel surface with label + serial + brackets
    │   ├── HUDButton.tsx         # nav / action buttons
    │   ├── StatBar.tsx           # animated telemetry / stat bars
    │   ├── Reticle.tsx           # SVG reticle (decorative)
    │   ├── ScanlineFX.tsx        # sweeping CRT scanline
    │   ├── TopBar.tsx / BottomBar.tsx
    │   ├── HelpOverlay.tsx       # `?` modal — controls quickref
    │   ├── AchievementToast.tsx  # rarity-tiered achievement toaster
    │   └── TypeOn.tsx            # type-on terminal effect (respects prefers-reduced-motion)
    └── screens/
        ├── BootScreen.tsx        # boot sequence terminal
        ├── ProfileScreen.tsx     # identity card + dossier + trophies
        ├── ArsenalScreen.tsx     # projects as weapons w/ stat bars
        ├── MissionsScreen.tsx    # jobs as missions on a timeline
        ├── UpgradesScreen.tsx    # skills as an upgrade tree
        └── CommsScreen.tsx       # contact details + comms terminal
public/
├── reticle.svg                   # favicon
└── resume.pdf                    # served at /resume.pdf for the "DOSSIER" button
```

## Editing your portfolio

Open `src/data/profile.ts`. Everything in the UI flows from these typed objects:

| Edit this … | … to update the … |
| --- | --- |
| `operator` | Profile screen header, dossier, education, contact details |
| `projects[]` | Arsenal screen — each entry is a weapon with stats & rarity |
| `missions[]` | Missions screen timeline |
| `skills[]` | Upgrades screen tree (set `signature: true` for starred nodes) |
| `trophies[]` | Trophy row on the Profile screen |

Rarities map to colors: `common`, `rare` (blue), `epic` (orange), `gold`, `classified` (red). Use them deliberately — the loudest color is the rarest.

To swap the dossier PDF, drop a new `resume.pdf` into `public/`.

## Controls

| Key | Action |
| --- | --- |
| `1` `2` `3` `4` `5` | Jump to PROFILE / ARSENAL / MISSIONS / UPGRADES / COMMS |
| `Tab` | Cycle to next section |
| `Shift + Tab` | Cycle to previous section |
| `Esc` | Return to PROFILE |
| `?` | Toggle help overlay |
| `Space` / `Enter` / `Esc` (on boot) | Skip the boot sequence |

## Easter eggs

- **Boot screen** — runs a fake POST sequence the first time the page loads. Skippable with `Space`.
- **Per-section achievements** — visiting each screen for the first time fires a rarity-tiered toast.
- **Konami code** — `↑ ↑ ↓ ↓ ← → ← → B A` unlocks a **classified** achievement.
- **Custom crosshair cursor** — system-wide tactical reticle (`src/styles/index.css → --hud-cursor`).

## Design notes — what makes this *not* a generic AI dashboard

This portfolio commits to a single aesthetic instead of stacking on more sections. Specifically:

1. **One dominant color** — accent orange. Other tones (`rare` blue, `gold`, `danger` red) are *reserved* and only used to tier rarity. No rainbow gradients.
2. **Typography duality** — display in **Orbitron** (military stencil-adjacent), telemetry in **JetBrains Mono**, body in **Rajdhani**. Three fonts, three jobs.
3. **Texture, not just color** — corner brackets, hairline borders, dotted grid background, CRT scanlines, hatch fills for "locked" tiles. The page has *thickness*.
4. **Motion with intent** — entrance staggers, animated stat bars, type-on terminal. All gated behind `prefers-reduced-motion: reduce`.
5. **Asymmetric grids** — 7/5 splits, narrow rails, telemetry serials. Avoids "12-column equal cards" syndrome.
6. **Keyboard-first** — every section is reachable in one keystroke, like a real game UI.

## Accessibility

- All actions reachable with keyboard alone.
- Focus rings preserved (`focus-visible:ring-hud-accent`).
- `prefers-reduced-motion` disables type-on, sweeping rings, and the scanline.
- Body text holds **≥ 7.5:1** contrast against the panel background; mono dim text holds **≥ 4.5:1**.

## Deploying

This is a fully static SPA. Run `npm run build` and host the contents of `dist/` anywhere — Vercel, Netlify, GitHub Pages, Cloudflare Pages, or a single S3 bucket. No env vars, no server.

---

Built with intent. If you find the Konami code, you have done well, operator.
