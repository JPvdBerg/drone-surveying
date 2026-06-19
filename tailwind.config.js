/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Industrial, trust-forward palette: deep slate + precision orange accent.
        ink: {
          950: '#0a0f14',
          900: '#0f1620',
          800: '#16202c',
          700: '#1f2c3a',
        },
        accent: {
          DEFAULT: '#ff6a1a',
          600: '#e85b10',
          400: '#ff8a4d',
        },
        steel: {
          400: '#8aa0b4',
          300: '#aebccb',
          200: '#cdd8e2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
};
