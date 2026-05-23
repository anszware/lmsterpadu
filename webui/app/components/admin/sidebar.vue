<template>
    <aside
        class="h-full bg-white dark:bg-[#111c43] text-slate-600 dark:text-[#a3afbb] transition-all duration-300 overflow-y-auto overflow-x-hidden border border-slate-200 dark:border-white/5 shadow-xl w-full"
    >
        <div class="h-16 flex items-center justify-center border-b border-slate-100 dark:border-white/5 px-4 mb-2">
            <NuxtLink to="/admin" class="flex items-center gap-2.5">
                <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                    <Icon name="ph:graduation-cap-fill" class="text-white text-xl" />
                </div>
                <span v-if="!isCollapsed" class="font-bold text-xl text-slate-800 dark:text-white tracking-tight">YNEX <span class="text-primary opacity-80">Edu</span></span>
            </NuxtLink>
        </div>

        <div class="py-2 px-3 space-y-1">
            <div v-for="group in menuGroups" :key="group.title">
                <p v-if="!isCollapsed || isHovered"
                    class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4 opacity-70 dark:opacity-40 transition-opacity duration-300">
                    {{ group.title }}
                </p>

                <div class="space-y-1">
                    <NuxtLink v-for="item in group.items" :key="item.name" :to="item.to"
                        class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden" :class="[
                            $route.path === item.to 
                            ? 'bg-primary/5 dark:bg-white/5 text-primary dark:text-white' 
                            : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-[#a3afbb] hover:text-primary dark:hover:text-white'
                        ]">
                        <!-- Active Indicator Bar -->
                        <div v-if="$route.path === item.to" class="absolute right-0 top-2 bottom-2 w-1 bg-primary rounded-l-full"></div>
                        
                        <Icon :name="item.icon" size="20" class="flex-shrink-0 transition-colors" :class="[
                            $route.path === item.to ? 'text-primary' : 'group-hover:text-primary'
                        ]" />
                        <span v-if="!isCollapsed || isHovered" class="text-[13px] font-medium whitespace-nowrap transition-opacity duration-300">{{ item.name }}</span>

                        <span v-if="(!isCollapsed || isHovered) && item.badge"
                            class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-bold shadow-sm transition-opacity duration-300">
                            {{ item.badge }}
                        </span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
const props = defineProps(['isOpen', 'isCollapsed', 'isHovered'])
const emit = defineEmits(['toggle-mobile'])

const userRole = useCookie('user_role')

const menuGroups = computed(() => {
    const groups = []

    if (userRole.value === 'admin') {
        groups.push(
            {
                title: 'Main',
                items: [
                    { name: 'Dashboards', icon: 'ph:house-duotone', to: '/admin' },
                    { name: 'User Management', icon: 'ph:users-duotone', to: '/admin/users' },
                    { name: 'Manajemen Guru', icon: 'ph:chalkboard-teacher-duotone', to: '/admin/guru' }
                ]
            },
            {
                title: 'Master Data',
                items: [
                    { name: 'Jurusan', icon: 'ph:graduation-cap-duotone', to: '/admin/jurusan' },
                    { name: 'Sekolah', icon: 'ph:building-office', to: '/admin/sekolah' }
                ]
            }
        )
    }

    if (userRole.value === 'pic') {
        groups.push(
            {
                title: 'Sekolah',
                items: [
                    { name: 'Dashboard', icon: 'ph:house-duotone', to: '/sekolah' },
                    { name: 'Manajemen Jurusan', icon: 'ph:graduation-cap-duotone', to: '/sekolah/jurusan' },
                    { name: 'Data Siswa', icon: 'ph:student-duotone', to: '/sekolah/siswa' },
                    { name: 'Data Guru', icon: 'ph:chalkboard-teacher-duotone', to: '/sekolah/guru' },
                ]
            }
        )
    }

    if (userRole.value === 'teacher') {
        groups.push(
            {
                title: 'Guru',
                items: [
                    { name: 'Dashboard', icon: 'ph:house-duotone', to: '/guru' },
                    { name: 'Materi Saya', icon: 'ph:book-open-duotone', to: '/guru/courses' },
                ]
            }
        )
    }

    if (userRole.value === 'student') {
        groups.push(
            {
                title: 'Siswa',
                items: [
                    { name: 'Dashboard', icon: 'ph:house-duotone', to: '/siswa' },
                    { name: 'Nilai Saya', icon: 'ph:chart-bar-duotone', to: '/siswa/my-grades' },
                ]
            }
        )
    }

    return groups
})
</script>