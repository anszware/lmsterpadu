<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-0">
            <!-- Page Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 class="text-xl font-bold text-slate-800 dark:text-white">PIC Dashboard</h3>
                    <p class="text-[13px] text-slate-500 dark:text-slate-400">Welcome back, <strong>{{ sekolah?.nama || '...' }}</strong> monitor is active.</p>
                </div>
                <div class="flex items-center gap-2">
                    <button class="px-4 py-2 bg-white dark:bg-custom-sidebar border border-slate-200 dark:border-white/10 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                        <Icon name="ph:calendar-bold" size="16" />
                        <span>Filter by Date</span>
                    </button>
                    <button class="px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                        <Icon name="ph:download-bold" size="16" />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div v-for="stat in stats" :key="stat.title" 
                    class="bg-white dark:bg-custom-sidebar p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow group">
                    <div class="flex items-center justify-between mb-4">
                        <div :class="stat.bgColor" class="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                            <Icon :name="stat.icon" size="24" />
                        </div>
                        <div class="flex flex-col items-end">
                            <span :class="stat.trendColor" class="text-[11px] font-bold flex items-center gap-1">
                                <Icon :name="stat.trendIcon" size="12" />
                                {{ stat.trend }}
                            </span>
                            <span class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">vs last month</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{{ stat.title }}</p>
                        <h4 class="text-2xl font-bold text-slate-800 dark:text-white">{{ stat.value }}</h4>
                    </div>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Activity Chart Placeholder -->
                <div class="lg:col-span-2 bg-white dark:bg-custom-sidebar p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <div class="flex items-center justify-between mb-6">
                        <h5 class="text-[15px] font-bold text-slate-800 dark:text-white">School Activity Overview</h5>
                        <div class="flex items-center gap-2">
                            <button class="p-1.5 text-slate-400 hover:text-primary transition-colors"><Icon name="ph:dots-three-outline-vertical-fill" size="16" /></button>
                        </div>
                    </div>
                    <div class="h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-xl bg-slate-50/50 dark:bg-white/5 group">
                        <Icon name="ph:chart-line-up-bold" size="48" class="text-slate-300 dark:text-white/10 mb-4 transition-transform group-hover:scale-110" />
                        <p class="text-[13px] text-slate-400 font-medium">Activity Chart Visualization</p>
                    </div>
                </div>

                <!-- Recent Users List -->
                <div class="bg-white dark:bg-custom-sidebar p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <div class="flex items-center justify-between mb-6">
                        <h5 class="text-[15px] font-bold text-slate-800 dark:text-white">Akses Cepat</h5>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <NuxtLink v-for="menu in shortcuts" :key="menu.name" :to="menu.to" 
                            class="flex flex-col items-center p-3 rounded-lg border border-slate-100 dark:border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all text-center group">
                            <div :class="`w-10 h-10 rounded-lg flex items-center justify-center bg-${menu.color}-50 dark:bg-${menu.color}-900/20 text-${menu.color}-600 mb-2 group-hover:scale-110 transition-transform`">
                                <Icon :name="menu.icon" size="20" />
                            </div>
                            <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">{{ menu.name }}</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
    layout: false,
    middleware: 'role',
    allowedRoles: ['pic']
})

const { get } = useApi()
const profile = ref(null)
const sekolah = ref(null)
const loading = ref(true)

const stats = [
    { 
        title: 'Total Siswa', 
        value: '856', 
        icon: 'ph:users-duotone', 
        bgColor: 'bg-primary',
        trend: '+5.2%',
        trendIcon: 'ph:trend-up-bold',
        trendColor: 'text-success'
    },
    { 
        title: 'Total Guru', 
        value: '42', 
        icon: 'ph:chalkboard-teacher-duotone', 
        bgColor: 'bg-info',
        trend: '+2.1%',
        trendIcon: 'ph:trend-up-bold',
        trendColor: 'text-success'
    },
    { 
        title: 'Jurusan Aktif', 
        value: '6', 
        icon: 'ph:graduation-cap-duotone', 
        bgColor: 'bg-warning',
        trend: '0%',
        trendIcon: 'ph:minus-bold',
        trendColor: 'text-slate-400'
    },
    { 
        title: 'Lulusan (TA)', 
        value: '210', 
        icon: 'ph:student-duotone', 
        bgColor: 'bg-success',
        trend: '+12.4%',
        trendIcon: 'ph:trend-up-bold',
        trendColor: 'text-success'
    }
]

const shortcuts = [
    { name: 'Jurusan', to: '/sekolah/jurusan', icon: 'ph:graduation-cap-duotone', color: 'blue' },
    { name: 'Guru', to: '/sekolah/guru', icon: 'ph:chalkboard-teacher-duotone', color: 'indigo' },
    { name: 'Siswa', to: '/sekolah/siswa', icon: 'ph:student-duotone', color: 'emerald' },
    { name: 'Kelas', to: '/sekolah/kelas', icon: 'ph:door-duotone', color: 'purple' },
    { name: 'Mapel', to: '/sekolah/mapel', icon: 'ph:books-duotone', color: 'rose' },
    { name: 'Profil', to: '/sekolah/profile', icon: 'ph:buildings-duotone', color: 'orange' },
]

onMounted(async () => {
    try {
        const res = await get('/me')
        sekolah.value = res.sekolah
        profile.value = res.person
    } catch (error) {
        console.error('Failed to load profile:', error)
    } finally {
        loading.value = false
    }
})
</script>
