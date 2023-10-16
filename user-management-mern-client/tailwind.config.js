/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      fontFamily: {
        'josefin-sans': 'Josefin Sans, sans-serif',
      }
    },
  },
  plugins: [require("daisyui")],
}