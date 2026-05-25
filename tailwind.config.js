/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Operator HUD palette — committed dominant color story
        hud: {
          bg: '#0b0d10', // deep tactical black
          panel: '#11151b', // slightly lifted panel
          ink: '#1a2028', // borders / dividers
          grid: '#1e2731', // grid lines
          text: '#c9d2dc', // body text
          dim: '#6b7785', // secondary text
          muted: '#3a4453', // very dim text
          accent: '#ff6a35', // signature orange (from reference screenshot)
          accentDim: '#b94a22',
          accentGlow: '#ff8a5b',
          good: '#7cf9b6', // active / online green
          warn: '#ffd166', // caution amber
          danger: '#ff4757', // alarm red
          rare: '#62a8ff', // rare loot blue
          gold: '#f4c95d', // gold rarity
        },
      },
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        body: ['Rajdhani', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        hud: '0.18em',
      },
      backgroundImage: {
        'hud-grid':
          'linear-gradient(rgba(30,39,49,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(30,39,49,0.45) 1px, transparent 1px)',
        'hud-radial':
          'radial-gradient(ellipse at top, rgba(255,106,53,0.06), transparent 60%)',
      },
      backgroundSize: {
        'grid-32': '32px 32px',
      },
      boxShadow: {
        'hud-inner': 'inset 0 0 0 1px rgba(255,255,255,0.04)',
        'hud-glow': '0 0 24px rgba(255,106,53,0.25)',
        'hud-glow-soft': '0 0 12px rgba(255,106,53,0.18)',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '47%, 53%': { opacity: '0.92' },
          '50%': { opacity: '0.7' },
        },
        pulse_dot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.7)' },
        },
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bracketIn: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        scan: 'scan 6s linear infinite',
        flicker: 'flicker 4s steps(1, end) infinite',
        'pulse-dot': 'pulse_dot 1.4s ease-in-out infinite',
        sweep: 'sweep 4s linear infinite',
        'bracket-in': 'bracketIn 320ms ease-out both',
        'fade-up': 'fadeUp 420ms ease-out both',
      },
    },
  },
  plugins: [],
};
