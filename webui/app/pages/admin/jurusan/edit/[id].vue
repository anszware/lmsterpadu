<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Edit Jurusan</h1>
      <nav class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/admin" class="text-blue-500 hover:underline">Admin</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <NuxtLink to="/admin/jurusan" class="text-blue-500 hover:underline">Jurusan</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-500 dark:text-slate-400">Edit</span>
      </nav>
    </div>

    <div v-if="loading" class="p-12 text-center text-slate-500">
      Memuat data jurusan...
    </div>

    <div v-else class="p-6">
      <div class="max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-500 uppercase">Kode Jurusan</label>
            <input 
              v-model="form.kode_jurusan" 
              type="text" 
              placeholder="Contoh: RPL, TKJ, AK" 
              class="form-input-custom" 
              required 
            />
            <p v-if="errors.kode_jurusan" class="text-[10px] text-rose-500 mt-1">{{ errors.kode_jurusan[0] }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-500 uppercase">Nama Jurusan</label>
            <input 
              v-model="form.nama_jurusan" 
              type="text" 
              placeholder="Contoh: Rekayasa Perangkat Lunak" 
              class="form-input-custom" 
              required 
            />
            <p v-if="errors.nama_jurusan" class="text-[10px] text-rose-500 mt-1">{{ errors.nama_jurusan[0] }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-500 uppercase">Deskripsi</label>
            <textarea 
              v-model="form.deskripsi" 
              rows="4" 
              placeholder="Keterangan singkat tentang jurusan ini..." 
              class="form-input-custom"
            ></textarea>
            <p v-if="errors.deskripsi" class="text-[10px] text-rose-500 mt-1">{{ errors.deskripsi[0] }}</p>
          </div>

          <div class="pt-4 border-t dark:border-slate-700 flex justify-end gap-3">
            <NuxtLink to="/admin/jurusan" class="px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              Batal
            </NuxtLink>
            <button 
              type="submit" 
              :disabled="submitting" 
              class="bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
            >
              {{ submitting ? 'Memperbarui...' : 'Update Jurusan' }}
            </button>
          </div>
        </form>
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

const route = useRoute()
const router = useRouter()
const { get, put } = useApi()
const { showAlert } = useAlert()

const jurusanId = route.params.id
const loading = ref(true)
const submitting = ref(false)
const errors = ref({})

const form = reactive({
  kode_jurusan: '',
  nama_jurusan: '',
  deskripsi: ''
})

onMounted(async () => {
  try {
    const response = await get(`/admin/jurusan/${jurusanId}`)
    const data = response.data
    form.kode_jurusan = data.kode_jurusan
    form.nama_jurusan = data.nama_jurusan
    form.deskripsi = data.deskripsi
  } catch (error) {
    console.error('Failed to load jurusan data:', error)
    showAlert({
      title: 'Error!',
      text: 'Gagal memuat data jurusan.',
      icon: 'error'
    })
    router.push('/admin/jurusan')
  } finally {
    loading.value = false
  }
})

const submitForm = async () => {
  submitting.value = true
  errors.value = {}

  try {
    await put(`/admin/jurusan/${jurusanId}`, form)

    showAlert({
      title: 'Berhasil!',
      text: 'Data jurusan telah diperbarui.',
      icon: 'success',
      timer: 1500
    })
    
    router.push('/admin/jurusan')
  } catch (error) {
    if (error.status === 422) {
      errors.value = error.data?.errors || {}
      showAlert({
        title: 'Validasi Gagal!',
        text: 'Mohon periksa kembali inputan Anda.',
        icon: 'error'
      })
    } else {
      showAlert({
        title: 'Gagal!',
        text: error.data?.message || 'Terjadi kesalahan saat memperbarui jurusan.',
        icon: 'error'
      })
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-input-custom {
  @apply w-full p-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700 dark:text-slate-200;
}
</style>
