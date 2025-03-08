/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4dabf5',
          main: '#2196f3',
          dark: '#1769aa',
        },
        secondary: {
          light: '#f73378',
          main: '#f50057',
          dark: '#ab003c',
        },
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // This enables compatibility with Material UI
  corePlugins: {
    preflight: false,
  },
}
