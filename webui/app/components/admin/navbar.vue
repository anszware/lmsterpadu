<template>
    <nav class="bg-white dark:bg-[#111c43] h-16 flex items-center justify-between px-6 transition-all duration-300 relative w-full">
        <div class="flex items-center gap-4 flex-grow">
            <button @click="$emit('toggle-sidebar')" class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                <Icon name="ph:list-bold" size="20" />
            </button>
            <div class="hidden md:flex items-center bg-slate-100 dark:bg-white/5 rounded-lg px-4 py-2 border border-transparent focus-within:border-primary/20 focus-within:bg-white dark:focus-within:bg-[#111c43] transition-all group max-w-xs lg:max-w-md w-full">
                <Icon name="ph:magnifying-glass" size="18" class="text-slate-400 group-focus-within:text-primary" />
                <input type="text" placeholder="Search..." class="bg-transparent border-none text-[13px] focus:ring-0 w-full placeholder:text-slate-400 ml-2">
            </div>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0">
            <!-- Theme Toggle -->
            <button @click="toggleDark" class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors relative group">
                <Icon :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" size="20" />
            </button>

            <!-- Notifications Dropdown -->
            <div class="relative">
                <button @click.stop="toggleNotifications" class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors relative group">
                    <Icon name="ph:bell-bold" size="20" />
                    <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-white dark:border-[#111c43]"></span>
                </button>
                
                <transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <div v-if="isNotificationsOpen" v-click-outside="closeNotifications"
                        class="absolute right-0 mt-3 w-80 bg-white dark:bg-[#111c43] rounded-xl shadow-2xl border border-slate-100 dark:border-white/5 z-[60] overflow-hidden">
                        <div class="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                            <h6 class="text-[14px] font-bold text-slate-800 dark:text-white">Notifications</h6>
                            <span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">4 NEW</span>
                        </div>
                        <div class="max-h-[350px] overflow-y-auto">
                            <div v-for="notif in notifications" :key="notif.id" 
                                class="px-5 py-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors flex gap-3">
                                <div :class="notif.bgColor" class="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                                    <Icon :name="notif.icon" size="18" />
                                </div>
                                <div class="flex-grow">
                                    <p class="text-[12px] font-bold text-slate-800 dark:text-white mb-0.5">{{ notif.title }}</p>
                                    <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{{ notif.message }}</p>
                                    <p class="text-[10px] text-slate-400 mt-1 font-medium">{{ notif.time }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="p-2">
                            <button class="w-full py-2 text-[12px] font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">View All Notifications</button>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- Apps Shortcut -->
            <div class="relative group">
                <button class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                    <Icon name="ph:squares-four-bold" size="20" />
                </button>
                <div
                    class="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#111c43] rounded-xl shadow-2xl border border-slate-100 dark:border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-4 grid grid-cols-3 gap-4 z-50">
                    <div v-for="app in apps" :key="app.name"
                        class="flex flex-col items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer group/app">
                        <div :class="app.color"
                            class="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover/app:scale-110">
                            <Icon :name="app.icon" size="20" />
                        </div>
                        <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">{{ app.name }}</span>
                    </div>
                </div>
            </div>

            <!-- Profile Dropdown -->
            <div class="relative ml-2">
                <button @click.stop="toggleProfile"
                    class="flex items-center gap-3 p-1 pr-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all">
                    <img :src="userAvatar"
                        class="w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 object-cover shadow-sm"
                        :alt="userName">
                    <div class="hidden lg:block text-left leading-tight">
                        <p class="text-[13px] font-bold text-slate-800 dark:text-white">{{ userName }}</p>
                        <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider opacity-70">{{ userRole }}</p>
                    </div>
                    <Icon name="ph:caret-down-bold" size="10" class="text-slate-400" />
                </button>

                <transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <div v-if="isProfileOpen" v-click-outside="closeProfile"
                        class="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#111c43] rounded-xl shadow-2xl border border-slate-100 dark:border-white/5 z-[60] py-2 overflow-hidden">
                        <div class="px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                            <p class="text-[13px] font-bold text-slate-800 dark:text-white truncate">{{ userName }}</p>
                            <p class="text-[11px] text-slate-400 font-medium truncate opacity-80">{{ userRole }}</p>
                        </div>
                        <div class="p-1.5">
                            <NuxtLink to="/admin/profile"
                                class="flex items-center gap-3 px-3.5 py-2.5 text-[13px] text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors group">
                                <Icon name="ph:user-circle-bold" size="20" class="text-slate-400 group-hover:text-primary" /> Profile
                            </NuxtLink>
                            <NuxtLink to="/admin/settings"
                                class="flex items-center gap-3 px-3.5 py-2.5 text-[13px] text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors group">
                                <Icon name="ph:gear-six-bold" size="20" class="text-slate-400 group-hover:text-primary" /> Settings
                            </NuxtLink>
                            <div class="my-1.5 border-t border-slate-100 dark:border-white/5"></div>
                            <button @click="handleLogout"
                                class="w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] text-danger hover:bg-danger/10 rounded-lg transition-colors group">
                                <Icon name="ph:sign-out-bold" size="20" class="text-danger/70 group-hover:text-danger" /> Log Out
                            </button>
                        </div>
                    </div>
                </transition>
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
const userFoto = useCookie('user_foto')
const { toast } = useAlert()
const config = useRuntimeConfig()

const userAvatar = computed(() => {
    if (userFoto.value) {
        // Jalur standar Laravel storage link adalah /storage/ diikuti path file di dalam storage/app/public
        const baseUrl = config.public.apiBase.replace('/api', '')
        return `${baseUrl}/storage/${userFoto.value}`
    }
    // Jika tidak ada, gunakan inisial dari userName (menggunakan ui-avatars)
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value || 'User')}&background=0D8ABC&color=fff`
})

const isLoggingOut = ref(false)
const isProfileOpen = ref(false)
const isNotificationsOpen = ref(false)
const isShortcutOpen = ref(false)

const toggleNotifications = () => {
    isProfileOpen.value = false
    isShortcutOpen.value = false
    isNotificationsOpen.value = !isNotificationsOpen.value
}

const closeNotifications = () => {
    isNotificationsOpen.value = false
}

// Fungsi Toggle dengan Stop Propagation
const toggleProfile = () => {
    isNotificationsOpen.value = false
    isShortcutOpen.value = false
    isProfileOpen.value = !isProfileOpen.value
}

const closeProfile = () => {
    isProfileOpen.value = false
}

const notifications = [
    { id: 1, title: 'New Student Registered', message: 'Ahmad Fauzi has registered as a new student in SMKN 1 Jakarta.', time: '5 mins ago', icon: 'ph:user-plus-bold', bgColor: 'bg-primary' },
    { id: 2, title: 'System Update', message: 'The system has been updated to version 2.4.0. Check the changelog for details.', time: '2 hours ago', icon: 'ph:arrow-clockwise-bold', bgColor: 'bg-info' },
    { id: 3, title: 'Export Completed', message: 'Your school report export is ready for download.', time: '5 hours ago', icon: 'ph:file-arrow-down-bold', bgColor: 'bg-success' },
    { id: 4, title: 'Security Alert', message: 'New login detected from a new IP address: 192.168.1.45.', time: '1 day ago', icon: 'ph:shield-warning-bold', bgColor: 'bg-warning' },
]

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