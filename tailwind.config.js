const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        red: {
          300: '#E79D80',
          400: '#E69879',
          500: '#E04500',
          600: '#CF3B00',
          700: '#8B1300',
        },  
      },
      fontFamily: {
        sans: ['Titillium Web',...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: []
};
