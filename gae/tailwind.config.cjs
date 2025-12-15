module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './componentes/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ['var(--font-futura)'],
        'futura-condensed': ['var(--font-futura-condensed)'],
        syntha: ['var(--font-syntha)'],
      },
      colors: {
        primary: '#cbda00',
        secondary: '#4c5859',
        extra: '#4c5859',
      },
      height: {
        'header': '100px',
      },
      paddingTop: {
        'header': '100px',
      },
      
    },
  },
  plugins: [],
};
