/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Aktifkan mode gelap dengan class 'dark'
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Mengambil inspirasi warna dari referensi YNEX
        primary: "#1e40af", // blue-800
      }
    },
  },
  plugins: [],
}