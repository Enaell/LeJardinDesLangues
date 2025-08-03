/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f8f2',
          100: '#e0f0e0',
          200: '#c2e0c2',
          300: '#97c997',
          400: '#6fa96f',
          500: '#3d8b3d', // Couleur principale
          600: '#327032',
          700: '#295c29',
          800: '#204820',
          900: '#183618',
          950: '#0d210d',
        },
        secondary: {
          50: '#f4f6f4',
          100: '#e7ebe7',
          200: '#d1d8d1',
          300: '#b0bdb0',
          400: '#8a9c8a',
          500: '#6b7f6b', // Couleur secondaire
          600: '#556b55',
          700: '#455645',
          800: '#3a4739',
          900: '#323b32',
          950: '#191f19',

        },
      },
      fontFamily: {
        chinese: ['Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        french: ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
