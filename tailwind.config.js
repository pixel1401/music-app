/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
}