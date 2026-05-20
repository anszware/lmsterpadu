<template>
    <nav class="fixed top-0 right-0 left-0 bg-white border-b border-slate-100 h-16 z-30 flex items-center justify-between px-4 transition-all duration-300"
        :class="[isCollapsed ? 'md:ml-20' : 'md:ml-64', 'left-0']">
        <div class="flex items-center gap-4">
            <button @click="$emit('toggle-sidebar')" class="p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
                <Icon v-if="!isCollapsed" name="ph:list-bold" size="20" />
                <Icon v-else name="ph:x" size="20" />
            </button>
            <div class="hidden md:flex items-center bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-100">
                <Icon name="ph:magnifying-glass" class="text-slate-400 mr-2" />
                <input type="text" placeholder="Search..." class="bg-transparent border-none text-sm focus:ring-0 w-48">
            </div>
        </div>

        <div class="flex items-center gap-1 md:gap-3">
            <button @click="toggleDark" class="p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                <Icon :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" size="20" />
            </button>

            <div class="relative group">
                <button class="p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                    <Icon name="ph:squares-four-bold" size="20" />
                </button>
                <div
                    class="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-4 grid grid-cols-3 gap-4">
                    <div v-for="app in apps" :key="app.name"
                        class="flex flex-col items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                        <div :class="app.color"
                            class="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm">
                            <Icon :name="app.icon" size="20" />
                        </div>
                        <span class="text-[10px] font-semibold text-slate-600">{{ app.name }}</span>
                    </div>
                </div>
            </div>
            <div class="relative ml-2">
                <button @click.stop="toggleProfile"
                    class="flex items-center gap-3 p-1 hover:bg-slate-50 rounded-lg transition-all">
                    <img src="https://ui-avatars.com/api/?name=Saepul+Anwari"
                        class="w-8 h-8 rounded-lg border border-slate-200">
                    <div class="hidden lg:block text-left leading-tight">
                        <p class="text-xs font-bold text-slate-800">{{ userName }}</p>
                        <p class="text-[10px] text-slate-400">{{ userRole }}</p>
                    </div>
                    <Icon name="ph:caret-down-bold" size="12" class="text-slate-400" />
                </button>

                <div v-if="isProfileOpen" v-click-outside="closeProfile"
                    class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-[60] py-2">
                    <NuxtLink to="/admin/profile"
                        class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                        <Icon name="ph:user-circle-bold" size="18" /> Profile
                    </NuxtLink>
                    <button @click="handleLogout"
                        class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left">
                        <Icon name="ph:sign-out-bold" size="18" /> Log Out
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
defineProps(['isCollapsed'])
const colorMode = useColorMode()
const isDark = ref(false)
const userName = useCookie('user_name')
const userRole = useCookie('user_role')
const { toast } = useAlert()
const config = useRuntimeConfig()
const isLoggingOut = ref(false)
const isProfileOpen = ref(false)
const isShortcutOpen = ref(false)

// Fungsi Toggle dengan Stop Propagation
const toggleProfile = () => {
    isShortcutOpen.value = false // Tutup menu lain jika terbuka
    isProfileOpen.value = !isProfileOpen.value
}

const closeProfile = () => {
    isProfileOpen.value = false
}

const apps = [
    { name: 'Github', icon: 'ph:github-logo', color: 'bg-slate-800' },
    { name: 'G-Mail', icon: 'ph:envelope', color: 'bg-red-500' },
    { name: 'Calendar', icon: 'ph:calendar', color: 'bg-blue-500' },
    { name: 'Map', icon: 'ph:map-trifold', color: 'bg-green-500' },
    { name: 'Shop', icon: 'ph:shopping-cart', color: 'bg-orange-500' },
    { name: 'Chat', icon: 'ph:chat-centered-text', color: 'bg-indigo-500' },
]

const toggleDark = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark')
}
if (process.client) {
    window.addEventListener('click', () => {
        isProfileOpen.value = false
        isShortcutOpen.value = false
    })
}
const handleLogout = async () => {
    isLoggingOut.value = true
    const token = useCookie('access_token')

    try {
        const response = await $fetch('/logout', {
            baseURL: config.public.apiBase,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Accept': 'application/json'
            }
        })

        // Apapun responnya (sukses/gagal di server), kita hapus cookie lokal agar aman
        token.value = null
        useCookie('user_name').value = null
        toast('Berhasil keluar akun', 'success')
        navigateTo('/login')
    } catch (e) {
        toast('Gagal menghubungi server', 'error')
    } finally {
        isLoggingOut.value = false
    }
}

</script>