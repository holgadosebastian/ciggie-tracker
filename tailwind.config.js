/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        lighter: 'var(--color-lighter)',
        light: 'var(--color-light)',
        dark: 'var(--color-dark)',
        darker: 'var(--color-darker)'
      }
    }
  },
  plugins: []
};
