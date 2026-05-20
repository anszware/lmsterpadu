<template>
  <div class="min-h-screen bg-slate-50 font-inter">
    <AdminSidebar :is-open="isSidebarOpen" :is-collapsed="isSidebarCollapsed" @toggle-mobile="isSidebarOpen = false" />

    <div class="transition-all duration-300 flex flex-col min-h-screen" :class="[
      isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64',
      !isSidebarOpen ? 'pl-0' : ''
    ]">
      <AdminNavbar :is-collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar"
        @toggle-mobile="isSidebarOpen = true" />

      <main class="flex-grow p-4 md:p-6 mt-16">
        <slot />
      </main>

      <footer class="bg-white border-t border-slate-100 p-4 text-center text-xs text-slate-500">
        Copyright © 2026 <span class="font-bold text-slate-900">YNEX</span>. Designed with ❤️ by <span
          class="text-blue-600">Spruko</span> All rights reserved
      </footer>
    </div>

    <div v-if="isSidebarOpen" class="fixed inset-0 bg-slate-900/50 z-40 md:hidden" @click="isSidebarOpen = false"></div>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(false) // Untuk mobile
const isSidebarCollapsed = ref(false) // Untuk desktop (Gambar 1 & 2)

const toggleSidebar = () => {
  if (window.innerWidth >= 768) {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  } else {
    isSidebarOpen.value = !isSidebarOpen.value
  }
}
</script>