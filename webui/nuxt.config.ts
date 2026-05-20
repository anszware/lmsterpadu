// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/icon'],

  // Solusi untuk error #app-manifest
  experimental: {
    appManifest: false
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  },
  colorMode: {
    classSuffix: '', // Penting agar class yang muncul hanya 'dark' (bukan 'dark-mode')
    preference: 'light', // Default tema saat pertama buka
    fallback: 'light',
  }

})