/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      'grey-900': '#111727',
      orange: '#E36209',
      'slate-grey': '#5C646D',
      'brown-grey': '#666666',
      'warn-grey': '#999999',
      'pale-grey': '#E1E4E8',
      'white-secondary': '#E3E3E3',
      'slate-grey-secondary': '#586069',
    },
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
    },
  },
  plugins: [],
};
