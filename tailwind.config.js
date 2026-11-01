/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07090C',
          900: '#0D1117',
          800: '#121821',
          700: '#1A2230',
        },
        fg: {
          DEFAULT: '#E6EDF3',
          muted: '#8B98A9',
          faint: '#5B6878',
        },
        signal: {
          cyan: '#22D3EE',
          violet: '#8B7CF6',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};
