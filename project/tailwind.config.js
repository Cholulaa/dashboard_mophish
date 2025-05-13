/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom colors can be added here if needed
      },
      boxShadow: {
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px #0f141d, -5px -5px 15px #151c2f',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};