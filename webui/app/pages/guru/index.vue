<template>
  <NuxtLayout name="admin">
    <div class="p-4 md:p-0">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">Teacher Dashboard</h3>
          <p class="text-[13px] text-slate-500 dark:text-slate-400">Welcome back, <strong>{{ profile?.full_name || 'Guru' }}</strong>. Ready to inspire today?</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-4 py-2 bg-white dark:bg-custom-sidebar border border-slate-200 dark:border-white/10 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Icon name="ph:calendar-bold" size="16" />
            <span>My Schedule</span>
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div v-for="stat in stats" :key="stat.title" 
            class="bg-white dark:bg-custom-sidebar p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow group">
            <div class="flex items-center justify-between mb-4">
                <div :class="stat.bgColor" class="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                    <Icon :name="stat.icon" size="24" />
                </div>
                <div class="flex flex-col items-end">
                    <span class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{{ stat.sub }}</span>
                </div>
            </div>
            <div>
                <p class="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{{ stat.title }}</p>
                <h4 class="text-2xl font-bold text-slate-800 dark:text-white">{{ stat.value }}</h4>
            </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Class List / Courses -->
          <div class="lg:col-span-2 bg-white dark:bg-custom-sidebar p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
            <div class="flex items-center justify-between mb-6">
              <h5 class="text-[15px] font-bold text-slate-800 dark:text-white">Active Courses</h5>
              <button class="text-[11px] font-bold text-primary hover:underline uppercase tracking-wider">All Courses</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="i in 3" :key="i" class="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Icon name="ph:book-open-bold" size="20" />
                        </div>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">ONGOING</span>
                    </div>
                    <h6 class="font-bold text-slate-800 dark:text-white mb-1 group-hover:text-primary transition-colors">Mathematics Grade X - IPA 1</h6>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">32 Students • 4 Assignments Today</p>
                    <div class="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-primary h-full" style="width: 75%"></div>
                    </div>
                    <div class="flex justify-between items-center mt-2">
                        <span class="text-[10px] font-bold text-slate-400 uppercase">Syllabus Progress</span>
                        <span class="text-[10px] font-bold text-primary">75%</span>
                    </div>
                </div>
            </div>
          </div>

          <!-- Quick Actions & Tasks -->
          <div class="bg-white dark:bg-custom-sidebar p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
            <h5 class="text-[15px] font-bold text-slate-800 dark:text-white mb-6">Quick Actions</h5>
            <div class="space-y-3">
                <button class="w-full p-3 rounded-lg border border-slate-100 dark:border-white/5 flex items-center gap-3 hover:bg-primary hover:text-white transition-all group">
                    <Icon name="ph:pencil-circle-bold" size="24" class="text-primary group-hover:text-white" />
                    <span class="text-sm font-bold">Input Grades</span>
                </button>
                <button class="w-full p-3 rounded-lg border border-slate-100 dark:border-white/5 flex items-center gap-3 hover:bg-info hover:text-white transition-all group">
                    <Icon name="ph:check-square-offset-bold" size="24" class="text-info group-hover:text-white" />
                    <span class="text-sm font-bold">Mark Attendance</span>
                </button>
                <button class="w-full p-3 rounded-lg border border-slate-100 dark:border-white/5 flex items-center gap-3 hover:bg-warning hover:text-white transition-all group">
                    <Icon name="ph:file-plus-bold" size="24" class="text-warning group-hover:text-white" />
                    <span class="text-sm font-bold">New Assignment</span>
                </button>
            </div>
            
            <h5 class="text-[14px] font-bold text-slate-800 dark:text-white mt-8 mb-4 uppercase tracking-wider opacity-60">Pending Reviews</h5>
            <div class="space-y-4">
                <div v-for="i in 2" :key="i" class="flex gap-3 items-center">
                    <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                        <Icon name="ph:clock-bold" />
                    </div>
                    <div class="flex-grow min-w-0">
                        <p class="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">Algebra Homework #4</p>
                        <p class="text-[10px] text-slate-500">12 Submissions pending</p>
                    </div>
                    <Icon name="ph:caret-right-bold" size="12" class="text-slate-300" />
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
  allowedRoles: ['guru', 'admin']
})

const { get } = useApi()
const profile = ref(null)
const loading = ref(true)

const stats = [
    { title: 'Total Students', value: '145', icon: 'ph:users-duotone', bgColor: 'bg-primary', sub: 'Active' },
    { title: 'Assignments', value: '12', icon: 'ph:clipboard-text-duotone', bgColor: 'bg-info', sub: 'This Week' },
    { title: 'Attendance', value: '98.5%', icon: 'ph:calendar-check-duotone', bgColor: 'bg-success', sub: 'Average' },
    { title: 'Classes', value: '6', icon: 'ph:chalkboard-bold', bgColor: 'bg-warning', sub: 'Per Week' }
]

onMounted(async () => {
    try {
        const res = await get('/me')
        profile.value = res.person
    } catch (error) {
        console.error('Failed to load profile:', error)
    } finally {
        loading.value = false
    }
})
</script>
