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
        primary: "#5c67f7",
        'primary-light': '#8e96ff',
        secondary: "#f5f6f7",
        success: "#26bf94",
        info: "#17a2b8",
        warning: "#ffc107",
        danger: "#f82649",
        light: "#f3f6f9",
        dark: "#232323",
        custom: {
          sidebar: "#111c43",
          header: "#ffffff",
          body: "#f0f1f7",
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
      }
    },
  },
  plugins: [],
}