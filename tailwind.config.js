/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['"Dancing Script"', 'cursive'], // Placeholder for custom font
      },
      colors: {
        'valentine-red': '#C62828', // Deep red for curtains
        'valentine-gold': '#FFD700', // Gold accents
        'paper-bg': '#F5F5DC', // Beige/Paper background
      }
    },
  },
  plugins: [],
}
