/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: 'var(--green-primary)',
        },
        slate: {
          surface: 'var(--slate-surface)',
          platinum: 'var(--slate-platinum)',
        },
        bg: {
          light: 'var(--bg-light)',
          card: 'var(--bg-card)',
          subtle: 'var(--bg-subtle)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          accent: 'var(--text-accent)',
        },
        accent: {
          glow: 'var(--accent-glow)',
        }
      },
      fontFamily: {
        mono: ['Roboto Mono', 'Menlo', 'Consolas', 'monospace'],
        sans: ['Roboto Mono', 'Menlo', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
