<template>
  <div class="min-h-screen bg-[#f0f1f7] dark:bg-dark font-inter text-slate-900 dark:text-slate-100 transition-colors duration-300 flex">
    <!-- Sidebar Container -->
    <div 
        class="fixed inset-y-0 left-0 z-50 transition-all duration-300 p-3" 
        :class="[
            isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0',
            (isSidebarCollapsed && !isSidebarHovered) ? 'md:w-24' : 'md:w-64'
        ]"
        @mouseenter="isSidebarHovered = true"
        @mouseleave="isSidebarHovered = false"
    >
        <AdminSidebar 
            :is-open="isSidebarOpen" 
            :is-collapsed="isSidebarCollapsed" 
            :is-hovered="isSidebarHovered"
            @toggle-mobile="isSidebarOpen = false" 
            class="h-full rounded-2xl shadow-xl transition-all duration-300" 
        />
    </div>

    <!-- Main Content Area -->
    <div class="flex-grow transition-all duration-300 flex flex-col min-h-screen relative w-full" :class="[
      (isSidebarCollapsed && !isSidebarHovered) ? 'md:pl-24' : 'md:pl-64'
    ]">
      <!-- Navbar Container -->
      <div class="p-3 sticky top-0 z-30 w-full max-w-[1600px] mx-auto">
          <AdminNavbar :is-collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar"
            @toggle-mobile="isSidebarOpen = true" class="rounded-xl shadow-sm border border-slate-200 dark:border-white/5" />
      </div>

      <!-- Content -->
      <main class="flex-grow p-4 md:p-6 max-w-[1600px] mx-auto w-full">
        <slot />
      </main>

      <footer class="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
        Copyright © 2026 <span class="font-bold text-slate-900 dark:text-white uppercase">YNEX</span>. Designed with ❤️ by <span
          class="text-primary font-semibold">Spruko</span> All rights reserved
      </footer>
    </div>

    <!-- Overlay Mobile -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden" @click="isSidebarOpen = false"></div>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(false) // Untuk mobile
const isSidebarCollapsed = useCookie('is_sidebar_collapsed', { default: () => false })
const isSidebarHovered = ref(false)

const toggleSidebar = () => {
  if (window.innerWidth >= 768) {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  } else {
    isSidebarOpen.value = !isSidebarOpen.value
  }
}

// Close sidebar on navigation (mobile)
const route = useRoute()
watch(() => route.path, () => {
  isSidebarOpen.value = false
})
</script>