<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Data Guru</h1>
      <nav class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/sekolah" class="text-blue-500 hover:underline">Sekolah</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-500 dark:text-slate-400">Guru</span>
      </nav>
    </div>

    <div class="p-6">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
        <div class="p-4 border-b dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="relative w-full md:w-64">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icon name="ph:magnifying-glass-bold" class="text-slate-400" />
            </span>
            <input 
              v-model="search" 
              type="text" 
              placeholder="Cari guru..." 
              class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <NuxtLink 
            to="/sekolah/guru/create" 
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
          >
            <Icon name="ph:plus-bold" />
            Tambah Guru
          </NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700">
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guru</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Identitas</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y dark:divide-slate-700">
              <tr v-if="pending" v-for="i in 5" :key="i" class="animate-pulse">
                <td colspan="4" class="px-6 py-4"><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div></td>
              </tr>
              <tr v-else-if="gurus.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-slate-500">Tidak ada data guru ditemukan.</td>
              </tr>
              <tr v-else v-for="guru in gurus" :key="guru.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img 
                      :src="guru.user?.person?.foto || `https://ui-avatars.com/api/?name=${guru.user?.person?.full_name || guru.user?.username}&background=random&color=fff`" 
                      class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <p class="text-sm font-bold text-slate-800 dark:text-white">
                        {{ guru.gelar_depan ? guru.gelar_depan + ' ' : '' }}{{ guru.user?.person?.full_name }}{{ guru.gelar_belakang ? ', ' + guru.gelar_belakang : '' }}
                      </p>
                      <p class="text-xs text-slate-500">{{ guru.user?.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-xs space-y-1">
                    <p><span class="font-semibold">NUPTK:</span> {{ guru.nuptk || '-' }}</p>
                    <p><span class="font-semibold">NIP:</span> {{ guru.nip || '-' }}</p>
                  </div>
                </td>
                <td class="px-6 py-4">
                   <div v-if="guru.sekolah && guru.sekolah.length > 0">
                      <div v-for="s in guru.sekolah" :key="s.id" class="mb-1">
                        <span :class="s.pivot?.status === 'aktif' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'" class="px-2 py-1 text-[10px] font-bold uppercase rounded-md border" :style="{ borderColor: s.pivot?.status === 'aktif' ? '#10b981' : '#94a3b8' }">
                          {{ s.pivot?.status }}
                        </span>
                      </div>
                   </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <NuxtLink 
                      :to="`/sekolah/guru/edit/${guru.id}`" 
                      class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Icon name="ph:pencil-simple-bold" size="18" />
                    </NuxtLink>
                    <button 
                      @click="confirmDelete(guru)" 
                      class="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Icon name="ph:trash-bold" size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 border-t dark:border-slate-700 flex items-center justify-between">
          <p class="text-xs text-slate-500">
            Menampilkan {{ meta.from || 0 }} - {{ meta.to || 0 }} dari {{ meta.total || 0 }} guru
          </p>
          <div class="flex gap-2">
            <button 
              :disabled="page === 1" 
              @click="page--"
              class="px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              Prev
            </button>
            <button 
              :disabled="page >= meta.last_page" 
              @click="page++"
              class="px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              Next
            </button>
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

const { get, del } = useApi()
const { showAlert } = useAlert()

const page = ref(1)
const search = ref('')
const gurus = ref([])
const meta = ref({})
const pending = ref(false)

const fetchGurus = async () => {
  pending.value = true
  try {
    const response = await get('/sekolah/guru', {
      page: page.value,
      search: search.value
    })
    gurus.value = response.data
    meta.value = response.meta
  } catch (error) {
    console.error('Failed to fetch gurus:', error)
  } finally {
    pending.value = false
  }
}

// Debounce logic for search
let searchTimeout = null
watch(search, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
    fetchGurus()
  }, 500)
})

watch(page, () => {
  fetchGurus()
})

onMounted(() => {
  fetchGurus()
})

const confirmDelete = async (guru) => {
  const result = await showAlert({
    title: 'Lepaskan Guru?',
    text: `Anda yakin ingin melepaskan guru ${guru.user?.person?.full_name} dari sekolah ini? Akun guru tetap ada di sistem.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Lepaskan',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#f82649'
  })

  if (result.isConfirmed) {
    try {
      await del(`/sekolah/guru/${guru.id}`)
      await fetchGurus()
      showAlert({
        title: 'Berhasil!',
        text: 'Guru telah dilepaskan dari sekolah.',
        icon: 'success',
        timer: 1500
      })
    } catch (error) {
      showAlert({
        title: 'Gagal!',
        text: error.data?.message || 'Terjadi kesalahan saat melepaskan guru.',
        icon: 'error'
      })
    }
  }
}
</script>
