module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ['var(--font-futura)'],
        'futura-condensed': ['var(--font-futura-condensed)'],
        syntha: ['var(--font-syntha)'],
      },
    },
  },
  plugins: [],
};
