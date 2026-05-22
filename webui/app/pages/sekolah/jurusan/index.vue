<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <div>
        <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Manajemen Jurusan</h1>
        <p class="text-xs text-slate-500 mt-0.5">Kelola program keahlian yang aktif di sekolah Anda</p>
      </div>
      <nav class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/sekolah" class="text-blue-500 hover:underline">Sekolah</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-500 dark:text-slate-400">Jurusan</span>
      </nav>
    </div>

    <div class="p-6">
      <div class="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm overflow-hidden">
        <div class="p-6 border-b dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div class="relative max-w-xs w-full">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Icon name="ph:magnifying-glass-bold" size="18" />
            </span>
            <input 
              v-model="search" 
              type="text" 
              placeholder="Cari jurusan..." 
              class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <button 
            @click="openAddModal"
            class="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="ph:plus-bold" />
            Tambah Jurusan
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700">
                <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-16 text-center">No</th>
                <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kode</th>
                <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nama Jurusan</th>
                <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y dark:divide-slate-700">
              <tr v-if="loading" v-for="i in 3" :key="i" class="animate-pulse">
                <td class="px-6 py-4"><div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-8 mx-auto"></div></td>
                <td class="px-6 py-4"><div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-16"></div></td>
                <td class="px-6 py-4"><div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-48"></div></td>
                <td class="px-6 py-4"><div class="h-8 bg-slate-100 dark:bg-slate-700 rounded w-20 ml-auto"></div></td>
              </tr>
              
              <tr v-else v-for="(item, index) in filteredJurusan" :key="item.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group">
                <td class="px-6 py-4 text-sm text-slate-500 text-center font-medium">{{ index + 1 }}</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">
                    {{ item.kode_jurusan || 'N/A' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ item.nama_jurusan }}</div>
                </td>
                <td class="px-6 py-4 text-right">
                  <button 
                    @click="confirmDelete(item)"
                    class="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Hapus Jurusan"
                  >
                    <Icon name="ph:trash-duotone" size="18" />
                  </button>
                </td>
              </tr>

              <tr v-if="!loading && filteredJurusan.length === 0">
                <td colspan="4" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center justify-center text-slate-400">
                    <Icon name="ph:files-thin" size="64" class="mb-4 opacity-20" />
                    <p class="text-sm font-medium">Belum ada jurusan yang ditambahkan</p>
                    <p class="text-[10px] mt-1">Klik tombol "Tambah Jurusan" untuk memulai</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeAddModal"></div>
      <div class="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div class="px-6 py-4 border-b dark:border-slate-700 flex items-center justify-between">
          <h3 class="font-bold text-slate-800 dark:text-white">Tambah Jurusan ke Sekolah</h3>
          <button @click="closeAddModal" class="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all">
            <Icon name="ph:x-bold" />
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pilih Jurusan</label>
            <div class="relative">
              <select 
                v-model="selectedJurusanId" 
                class="w-full p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700 dark:text-slate-200 appearance-none"
              >
                <option value="">Pilih Jurusan yang Tersedia</option>
                <option v-for="jur in availableJurusan" :key="jur.id" :value="jur.id">
                  [{{ jur.kode_jurusan }}] {{ jur.nama_jurusan }}
                </option>
              </select>
              <span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <Icon name="ph:caret-down-bold" />
              </span>
            </div>
            <p v-if="availableJurusan.length === 0 && !loadingAvailable" class="text-[10px] text-amber-500 font-medium">
              Semua jurusan yang tersedia sudah didaftarkan ke sekolah Anda.
            </p>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 flex gap-3">
            <Icon name="ph:info-bold" class="text-blue-600 flex-shrink-0" size="20" />
            <p class="text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed">
              Menambahkan jurusan akan memungkinkan Anda untuk mengelola kelas dan siswa dalam jurusan tersebut.
            </p>
          </div>
        </div>

        <div class="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-end gap-3">
          <button 
            @click="closeAddModal"
            class="px-6 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all"
          >
            Batal
          </button>
          <button 
            @click="saveJurusan"
            :disabled="!selectedJurusanId || submitting"
            class="bg-blue-600 text-white px-8 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Icon v-if="submitting" name="ph:circle-notch-bold" class="animate-spin" />
            Simpan Jurusan
          </button>
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

const { get, fetchapi } = useApi()
const { showAlert } = useAlert()

const search = ref('')
const loading = ref(true)
const loadingAvailable = ref(false)
const submitting = ref(false)
const showAddModal = ref(false)

const listJurusan = ref([])
const availableJurusan = ref([])
const selectedJurusanId = ref('')

const fetchListJurusan = async () => {
  loading.value = true
  try {
    const res = await get('/sekolah/jurusan')
    listJurusan.value = res.data || []
  } catch (error) {
    console.error('Failed to fetch jurusan:', error)
    showAlert({
      title: 'Gagal!',
      text: 'Terjadi kesalahan saat mengambil data jurusan.',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

const fetchAvailableJurusan = async () => {
  loadingAvailable.value = true
  try {
    const res = await get('/sekolah/jurusan/available')
    availableJurusan.value = res.data || []
  } catch (error) {
    console.error('Failed to fetch available jurusan:', error)
  } finally {
    loadingAvailable.value = false
  }
}

const filteredJurusan = computed(() => {
  if (!search.value) return listJurusan.value
  return listJurusan.value.filter(item => 
    item.nama_jurusan.toLowerCase().includes(search.value.toLowerCase()) ||
    item.kode_jurusan?.toLowerCase().includes(search.value.toLowerCase())
  )
})

const openAddModal = () => {
  selectedJurusanId.value = ''
  showAddModal.value = true
  fetchAvailableJurusan()
}

const closeAddModal = () => {
  showAddModal.value = false
}

const saveJurusan = async () => {
  if (!selectedJurusanId.value) return
  
  submitting.value = true
  try {
    await fetchapi('/sekolah/jurusan', {
      method: 'POST',
      body: { jurusan_id: selectedJurusanId.value }
    })
    
    showAlert({
      title: 'Berhasil!',
      text: 'Jurusan telah ditambahkan ke sekolah.',
      icon: 'success',
      timer: 1500
    })
    
    closeAddModal()
    fetchListJurusan()
  } catch (error) {
    showAlert({
      title: 'Gagal!',
      text: error.data?.message || 'Terjadi kesalahan saat menambahkan jurusan.',
      icon: 'error'
    })
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (item) => {
  if (confirm(`Apakah Anda yakin ingin menghapus jurusan "${item.nama_jurusan}" dari sekolah?`)) {
    deleteJurusan(item.id)
  }
}

const deleteJurusan = async (id) => {
  try {
    await fetchapi(`/sekolah/jurusan/${id}`, {
      method: 'DELETE'
    })
    
    showAlert({
      title: 'Berhasil!',
      text: 'Jurusan telah dihapus dari sekolah.',
      icon: 'success',
      timer: 1500
    })
    
    fetchListJurusan()
  } catch (error) {
    showAlert({
      title: 'Gagal!',
      text: error.data?.message || 'Terjadi kesalahan saat menghapus jurusan.',
      icon: 'error'
    })
  }
}

onMounted(() => {
  fetchListJurusan()
})
</script>
