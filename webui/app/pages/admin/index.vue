<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-0">
            <!-- Page Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 class="text-xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h3>
                    <p class="text-[13px] text-slate-500 dark:text-slate-400">Welcome back, monitoring system is active.</p>
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
                        <h5 class="text-[15px] font-bold text-slate-800 dark:text-white">System Activity Overview</h5>
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
                        <h5 class="text-[15px] font-bold text-slate-800 dark:text-white">Recent Logins</h5>
                        <NuxtLink to="/admin/users" class="text-[11px] font-bold text-primary hover:underline uppercase tracking-wider">View All</NuxtLink>
                    </div>
                    <div class="space-y-5">
                        <div v-for="user in recentUsers" :key="user.id" class="flex items-center gap-3">
                            <img :src="user.avatar" class="w-10 h-10 rounded-lg border border-slate-100 dark:border-white/10 object-cover" />
                            <div class="flex-grow min-w-0">
                                <p class="text-[13px] font-bold text-slate-800 dark:text-white truncate">{{ user.name }}</p>
                                <p class="text-[11px] text-slate-400 truncate">{{ user.role }} • {{ user.time }}</p>
                            </div>
                            <span class="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(38,191,148,0.5)]"></span>
                        </div>
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
    allowedRoles: ['admin']
})

const stats = [
    { 
        title: 'Total Schools', 
        value: '1,284', 
        icon: 'ph:building-office-bold', 
        bgColor: 'bg-primary',
        trend: '+12.5%',
        trendIcon: 'ph:trend-up-bold',
        trendColor: 'text-success'
    },
    { 
        title: 'Total Students', 
        value: '45,672', 
        icon: 'ph:student-bold', 
        bgColor: 'bg-info',
        trend: '+8.2%',
        trendIcon: 'ph:trend-up-bold',
        trendColor: 'text-success'
    },
    { 
        title: 'Total Teachers', 
        value: '3,892', 
        icon: 'ph:chalkboard-teacher-bold', 
        bgColor: 'bg-warning',
        trend: '-2.4%',
        trendIcon: 'ph:trend-down-bold',
        trendColor: 'text-danger'
    },
    { 
        title: 'Graduates', 
        value: '12,450', 
        icon: 'ph:graduation-cap-bold', 
        bgColor: 'bg-success',
        trend: '+15.1%',
        trendIcon: 'ph:trend-up-bold',
        trendColor: 'text-success'
    }
]

const recentUsers = [
    { id: 1, name: 'Saepul Anwari', role: 'Super Admin', time: '2 mins ago', avatar: 'https://ui-avatars.com/api/?name=Saepul+Anwari&background=5c67f7&color=fff' },
    { id: 2, name: 'Budi Santoso', role: 'School PIC', time: '15 mins ago', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=26bf94&color=fff' },
    { id: 3, name: 'Siti Aminah', role: 'Teacher', time: '45 mins ago', avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=ffc107&color=fff' },
    { id: 4, name: 'Ahmad Fauzi', role: 'Student', time: '1 hour ago', avatar: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=17a2b8&color=fff' },
    { id: 5, name: 'Dewi Lestari', role: 'School PIC', time: '3 hours ago', avatar: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=5c67f7&color=fff' }
]
</script>