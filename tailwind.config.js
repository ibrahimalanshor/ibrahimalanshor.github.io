const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Titillium Web', ...defaultTheme.fontFamily.serif]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

