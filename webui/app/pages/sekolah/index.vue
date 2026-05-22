<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Dashboard PIC</h1>
      <nav class="flex items-center space-x-2 text-sm">
        <span class="text-slate-500 dark:text-slate-400">Sekolah</span>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-900 dark:text-white font-medium">Dashboard</span>
      </nav>
    </div>

    <div class="p-6">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg relative overflow-hidden">
        <div class="relative z-10">
          <h2 class="text-2xl font-bold mb-2">Selamat Datang, {{ profile?.full_name || 'PIC Sekolah' }}!</h2>
          <p class="text-blue-100 max-w-xl">
            Anda login sebagai PIC Sekolah <strong>{{ sekolah?.nama || '...' }}</strong>. 
            Kelola data jurusan, guru, dan siswa sekolah Anda melalui menu yang tersedia.
          </p>
        </div>
        <Icon name="ph:school-duotone" class="absolute -right-8 -bottom-8 opacity-20" size="200" />
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.name" class="bg-white dark:bg-slate-800 p-6 rounded-2xl border dark:border-slate-700 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div :class="`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600`">
              <Icon :name="stat.icon" size="24" />
            </div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ stat.name }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-slate-800 dark:text-white">{{ stat.value }}</h3>
            <span v-if="stat.unit" class="text-sm text-slate-500">{{ stat.unit }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- School Info -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b dark:border-slate-700 flex items-center justify-between">
              <h3 class="font-bold text-slate-800 dark:text-white">Profil Sekolah</h3>
              <NuxtLink to="/sekolah/profile" class="text-xs text-blue-600 font-bold hover:underline">Detail</NuxtLink>
            </div>
            <div class="p-6 text-center">
              <div class="w-24 h-24 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-600">
                <img v-if="profile?.sekolah?.logo" :src="profile.sekolah.logo" class="w-full h-full object-contain p-2" />
                <Icon v-else name="ph:buildings-duotone" size="40" class="text-slate-400" />
              </div>
              <h4 class="font-bold text-slate-800 dark:text-white">{{ sekolah?.nama || 'Nama Sekolah' }}</h4>
              <p class="text-sm text-slate-500 mb-6 uppercase tracking-wider font-semibold">NPSN: {{ sekolah?.npsn || '-' }}</p>
              
              <div class="space-y-3 text-left">
                <div class="flex items-start gap-3">
                  <Icon name="ph:map-pin-duotone" class="text-slate-400 mt-0.5" />
                  <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {{ sekolah?.alamat || 'Alamat belum diatur' }}
                  </p>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="ph:phone-duotone" class="text-slate-400" />
                  <span class="text-xs text-slate-600 dark:text-slate-400">{{ sekolah?.tlp_sekolah || '-' }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <Icon name="ph:envelope-duotone" class="text-slate-400" />
                  <span class="text-xs text-slate-600 dark:text-slate-400">{{ sekolah?.email_sekolah || '-' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shortcut Menu -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm p-6">
            <h3 class="font-bold text-slate-800 dark:text-white mb-6">Akses Cepat</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <NuxtLink v-for="menu in shortcuts" :key="menu.name" :to="menu.to" class="flex flex-col items-center p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group text-center">
                <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center bg-${menu.color}-50 dark:bg-${menu.color}-900/20 text-${menu.color}-600 mb-4 group-hover:scale-110 transition-transform`">
                  <Icon :name="menu.icon" size="28" />
                </div>
                <span class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ menu.name }}</span>
                <p class="text-[10px] text-slate-400 mt-1">{{ menu.desc }}</p>
              </NuxtLink>
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
  allowedRoles: ['pic']
})

const { get } = useApi()
const profile = ref(null)
const sekolah = ref(null)
const loading = ref(true)

const stats = ref([
  { name: 'Total Siswa', value: '0', icon: 'ph:users-duotone', color: 'blue', unit: 'Siswa' },
  { name: 'Total Guru', value: '0', icon: 'ph:chalkboard-teacher-duotone', color: 'indigo', unit: 'Orang' },
  { name: 'Jurusan Aktif', value: '0', icon: 'ph:graduation-cap-duotone', color: 'emerald', unit: 'Program' },
  { name: 'Rasio Guru/Siswa', value: '1:32', icon: 'ph:chart-pie-duotone', color: 'orange' },
])

const shortcuts = [
  { name: 'Manajemen Jurusan', to: '/sekolah/jurusan', icon: 'ph:graduation-cap-duotone', color: 'blue', desc: 'Atur jurusan sekolah' },
  { name: 'Data Guru', to: '/sekolah/guru', icon: 'ph:chalkboard-teacher-duotone', color: 'indigo', desc: 'Kelola data pengajar' },
  { name: 'Data Siswa', to: '/sekolah/siswa', icon: 'ph:student-duotone', color: 'emerald', desc: 'Kelola data peserta didik' },
  { name: 'Jadwal Mengajar', to: '/sekolah/jadwal', icon: 'ph:calendar-duotone', color: 'orange', desc: 'Atur jadwal KBM' },
  { name: 'Data Kelas', to: '/sekolah/kelas', icon: 'ph:door-duotone', color: 'purple', desc: 'Kelola rombongan belajar' },
  { name: 'Mata Pelajaran', to: '/sekolah/mapel', icon: 'ph:books-duotone', color: 'rose', desc: 'Atur kurikulum sekolah' },
]

onMounted(async () => {
  try {
    const res = await get('/me')
    sekolah.value = res.sekolah
    profile.value = res.person
    console.log('Profile loaded:', res)
    // In a real app, you would also fetch stats from a dedicated PIC dashboard endpoint
  } catch (error) {
    console.error('Failed to load profile:', error)
  } finally {
    loading.value = false
  }
})
</script>
