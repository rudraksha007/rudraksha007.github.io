/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: ["*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addVariant }) {
      // Define custom child variants
      addVariant('child', '& > *'); // Targets all direct children
      addVariant('child-odd', '& > :nth-child(odd)'); // Odd children
      addVariant('child-even', '& > :nth-child(even)'); // Even children
    })
  ],
}

