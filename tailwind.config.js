module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'teal': {
          400: '#40E0D0', // Bleu turquoise
          500: '#20B2AA', // Version plus foncée
        },
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'blink-caret': {
          from: { 'border-color': 'transparent' },
          to: { 'border-color': '#40E0D0' },
        },
      },
    },
  },
  plugins: [],
}