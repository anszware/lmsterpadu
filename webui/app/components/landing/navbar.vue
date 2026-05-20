<template>
  <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 font-inter">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer" @click="scrollToSection('hero')">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Icon name="ph:graduation-cap-fill" class="text-white text-2xl" />
          </div>
          <span class="font-bold text-2xl tracking-tight text-gray-900">YNEX <span class="text-blue-600">Edu</span></span>
        </div>

        <div class="hidden md:flex space-x-10 text-sm font-semibold text-gray-600">
          <button v-for="item in menuItems" :key="item.id" 
            @click="scrollToSection(item.id)"
            class="hover:text-blue-600 transition-colors duration-300 relative group">
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        <div class="flex items-center gap-2 sm:gap-6">
          <NuxtLink 
            to="/login" 
            class="text-sm font-bold text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            Masuk
          </NuxtLink>

          <button class="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 active:scale-95">
            Coba Gratis
          </button>
          
          <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Icon :name="isMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="text-2xl" />
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white border-b border-gray-100 px-4 py-6 space-y-2 shadow-xl">
        <button v-for="item in menuItems" :key="item.id" 
          @click="scrollToSection(item.id)"
          class="block w-full text-left font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition">
          {{ item.name }}
        </button>
        <div class="pt-4 mt-2 border-t border-gray-50">
          <NuxtLink 
            to="/login" 
            class="block w-full text-left font-bold text-gray-700 hover:text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition"
          >
            Masuk ke Akun
          </NuxtLink>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
const isMenuOpen = ref(false)

const menuItems = [
  { name: 'Beranda', id: 'hero' },
  { name: 'Fitur', id: 'fitur' },
  { name: 'Harga', id: 'harga' },
  { name: 'FAQ', id: 'faq' }
]

const scrollToSection = (id) => {
  isMenuOpen.value = false
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
</script>