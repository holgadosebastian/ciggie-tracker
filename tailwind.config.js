/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        light: 'var(--color-light)',
        darker: 'var(--color-darker)'
      }
    }
  },
  plugins: []
};
