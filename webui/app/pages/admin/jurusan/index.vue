<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Manajemen Jurusan</h1>
      <nav class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/admin" class="text-blue-500 hover:underline">Admin</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-500 dark:text-slate-400">Jurusan</span>
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
              placeholder="Cari jurusan..." 
              class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <NuxtLink 
            to="/admin/jurusan/create" 
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
          >
            <Icon name="ph:plus-bold" />
            Tambah Jurusan
          </NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700">
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kode</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Jurusan</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Deskripsi</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y dark:divide-slate-700">
              <tr v-if="pending" v-for="i in 5" :key="i" class="animate-pulse">
                <td colspan="4" class="px-6 py-4"><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div></td>
              </tr>
              <tr v-else-if="jurusans.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-slate-500">Tidak ada data jurusan ditemukan.</td>
              </tr>
              <tr v-else v-for="item in jurusans" :key="item.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4">
                  <span class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                    {{ item.kode_jurusan }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm font-bold text-slate-800 dark:text-white">{{ item.nama_jurusan }}</p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-xs text-slate-500 line-clamp-1">{{ item.deskripsi || '-' }}</p>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <NuxtLink 
                      :to="`/admin/jurusan/edit/${item.id}`" 
                      class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Icon name="ph:pencil-simple-bold" size="18" />
                    </NuxtLink>
                    <button 
                      @click="confirmDelete(item)" 
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
            Menampilkan {{ meta.from || 0 }} - {{ meta.to || 0 }} dari {{ meta.total || 0 }} jurusan
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
  allowedRoles: ['admin']
})

const { get, del } = useApi()
const { showAlert } = useAlert()

const page = ref(1)
const search = ref('')
const jurusans = ref([])
const meta = ref({})
const pending = ref(false)

const fetchJurusans = async () => {
  pending.value = true
  try {
    const response = await get('/admin/jurusan', {
      page: page.value,
      search: search.value
    })
    jurusans.value = response.data
    meta.value = response.meta
  } catch (error) {
    console.error('Failed to fetch jurusans:', error)
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
    fetchJurusans()
  }, 500)
})

watch(page, () => {
  fetchJurusans()
})

onMounted(() => {
  fetchJurusans()
})

const confirmDelete = async (item) => {
  const result = await showAlert({
    title: 'Hapus Jurusan?',
    text: `Anda yakin ingin menghapus jurusan ${item.nama_jurusan}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#e11d48'
  })

  if (result.isConfirmed) {
    try {
      await del(`/admin/jurusan/${item.id}`)
      await fetchJurusans()
      showAlert({
        title: 'Berhasil!',
        text: 'Jurusan telah dihapus.',
        icon: 'success',
        timer: 1500
      })
    } catch (error) {
      showAlert({
        title: 'Gagal!',
        text: error.data?.message || 'Terjadi kesalahan saat menghapus jurusan.',
        icon: 'error'
      })
    }
  }
}
</script>
