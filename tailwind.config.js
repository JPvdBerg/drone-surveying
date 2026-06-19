/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Guard against purging classes that may be applied dynamically (e.g. accent
  // states built at runtime, or status colours used via string interpolation).
  safelist: [
    'opacity-0',
    'opacity-100',
    'translate-y-0',
    'translate-y-8',
    'animate-pulse',
    {
      pattern: /(bg|text|border|ring)-(accent|ink|steel)(-(200|300|400|600|700|800|900|950))?/,
      variants: ['hover', 'focus', 'active', 'group-hover'],
    },
  ],
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
