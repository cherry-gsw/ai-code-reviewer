/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F3A2C',
        secondary: '#8B7355',
        cream: '#F5F1E8',
        beige: '#E8E1D3',
      },
    },
  },
  plugins: [],
}
