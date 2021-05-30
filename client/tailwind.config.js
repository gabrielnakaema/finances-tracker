module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      'sans': ['Roboto', 'Arial', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
