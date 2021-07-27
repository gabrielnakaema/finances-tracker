module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      serif: ['Times New Roman', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
