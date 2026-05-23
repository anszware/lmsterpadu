<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Edit Data Guru</h1>
      <nav class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/sekolah" class="text-blue-500 hover:underline">Sekolah</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <NuxtLink to="/sekolah/guru" class="text-blue-500 hover:underline">Guru</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-500 dark:text-slate-400">Edit</span>
      </nav>
    </div>

    <div class="p-6">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700">
          <Icon name="ph:circle-notch-bold" size="48" class="animate-spin text-blue-600 mb-4" />
          <p class="text-slate-500 font-medium">Memuat data guru...</p>
      </div>

      <form v-else @submit.prevent="submitForm" class="grid grid-cols-12 gap-6">
        <!-- Akun & Foto -->
        <div class="col-span-12 lg:col-span-4 space-y-6">
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
            <h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700">
              Informasi Akun
            </h3>
            <div class="space-y-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Username</label>
                <input v-model="form.username" type="text" placeholder="username" class="form-input-custom" />
                <p v-if="errors.username" class="text-[10px] text-rose-500 mt-1">{{ errors.username[0] }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input v-model="form.email" type="email" placeholder="email@example.com" class="form-input-custom" required />
                <p v-if="errors.email" class="text-[10px] text-rose-500 mt-1">{{ errors.email[0] }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase text-blue-600">Password (Kosongkan jika tidak diubah)</label>
                <input v-model="form.password" type="password" placeholder="********" class="form-input-custom" />
                <p v-if="errors.password" class="text-[10px] text-rose-500 mt-1">{{ errors.password[0] }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Konfirmasi Password</label>
                <input v-model="form.password_confirmation" type="password" placeholder="********" class="form-input-custom" />
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
            <h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700">
              Foto Profil
            </h3>
            <div class="flex flex-col items-center gap-4">
              <div class="relative group">
                <img 
                  :src="previewUrl || (originalFoto ? getStorageUrl(originalFoto) : `https://ui-avatars.com/api/?name=${form.full_name}&background=0D8ABC&color=fff`)" 
                  class="w-32 h-32 rounded-xl border-4 border-slate-50 dark:border-slate-700 shadow-md object-cover" 
                />
                <label class="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg cursor-pointer transition-transform group-hover:scale-110">
                  <Icon name="ph:camera-bold" size="18" />
                  <input type="file" @change="handleFileUpload" class="hidden" accept="image/*" />
                </label>
              </div>
              <p class="text-[10px] text-slate-400 text-center uppercase font-bold">Format: JPG, PNG, Max 2MB</p>
            </div>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-8 space-y-6">
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
            <h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700 flex items-center gap-2">
              <Icon name="ph:user-bold" /> Data Personal
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NIK (16 Digit)</label>
                <input v-model="form.nik" type="text" placeholder="32xxxxxxxxxxxxxx" class="form-input-custom" required maxlength="16" />
                <p v-if="errors.nik" class="text-[10px] text-rose-500 mt-1">{{ errors.nik[0] }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nama Lengkap (Tanpa Gelar)</label>
                <input v-model="form.full_name" type="text" placeholder="Nama Lengkap" class="form-input-custom" required />
                <p v-if="errors.full_name" class="text-[10px] text-rose-500 mt-1">{{ errors.full_name[0] }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                <select v-model="form.gender" class="form-input-custom" required>
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
                <p v-if="errors.gender" class="text-[10px] text-rose-500 mt-1">{{ errors.gender[0] }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nomor HP</label>
                <input v-model="form.no_hp" type="text" placeholder="08xxxxxxxxxx" class="form-input-custom" required />
                <p v-if="errors.no_hp" class="text-[10px] text-rose-500 mt-1">{{ errors.no_hp[0] }}</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Tempat Lahir</label>
                <input v-model="form.tempat_lahir" type="text" placeholder="Kota Lahir" class="form-input-custom" required />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                <input v-model="form.tanggal_lahir" type="date" class="form-input-custom" required />
              </div>
            </div>
            
            <div class="mt-6 space-y-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                <textarea v-model="form.alamat" rows="2" placeholder="Jl. Contoh No. 123" class="form-input-custom" required></textarea>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Provinsi</label>
                  <select v-model="form.provinsi_id" @change="onProvinsiChange" class="form-input-custom" required>
                    <option value="">Pilih</option>
                    <option v-for="item in provinsis" :key="item.id" :value="item.id">{{ item.nama_provinsi }}</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Kota</label>
                  <select v-model="form.kota_id" :disabled="!form.provinsi_id" @change="onKotaChange" class="form-input-custom" required>
                    <option value="">Pilih Kota</option>
                    <option v-for="item in kotas" :key="item.id" :value="item.id">{{ item.nama_kota }}</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Kecamatan</label>
                  <select v-model="form.kecamatan_id" :disabled="!form.kota_id" @change="onKecamatanChange" class="form-input-custom" required>
                    <option value="">Pilih Kecamatan</option>
                    <option v-for="item in kecamatans" :key="item.id" :value="item.id">{{ item.nama_kecamatan }}</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Kelurahan</label>
                  <select v-model="form.kelurahan_id" :disabled="!form.kecamatan_id" class="form-input-custom" required>
                    <option value="">Pilih Kelurahan</option>
                    <option v-for="item in kelurahans" :key="item.id" :value="item.id">{{ item.nama_kelurahan }}</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">RT</label>
                  <input v-model="form.rt" type="text" placeholder="000" class="form-input-custom" required />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">RW</label>
                  <input v-model="form.rw" type="text" placeholder="000" class="form-input-custom" required />
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
            <h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700 flex items-center gap-2">
              <Icon name="ph:briefcase-bold" /> Data Profesi & Status
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Gelar Depan</label>
                <input v-model="form.gelar_depan" type="text" placeholder="Dr. / Drs." class="form-input-custom" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Gelar Belakang</label>
                <input v-model="form.gelar_belakang" type="text" placeholder="S.Pd / M.Pd" class="form-input-custom" required />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NUPTK</label>
                <input v-model="form.nuptk" type="text" placeholder="NUPTK" class="form-input-custom" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NIP</label>
                <input v-model="form.nip" type="text" placeholder="NIP" class="form-input-custom" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NRG</label>
                <input v-model="form.nrg" type="text" placeholder="NRG" class="form-input-custom" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Bidang MGMP</label>
                <select v-model="form.mgmp_id" class="form-input-custom">
                  <option value="">Pilih MGMP</option>
                  <option v-for="item in mgmps" :key="item.id" :value="item.id">{{ item.nama_mgmp }}</option>
                </select>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Status Guru di Sekolah</label>
                <select v-model="form.status_guru" class="form-input-custom" required>
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t dark:border-slate-700 flex justify-end gap-3">
              <NuxtLink to="/sekolah/guru" class="px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                Batal
              </NuxtLink>
              <button 
                type="submit" 
                :disabled="submitting" 
                class="bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
              >
                {{ submitting ? 'Memproses...' : 'Simpan Perubahan' }}
              </button>
            </div>
          </div>
        </div>
      </form>
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
const { fetchProvinsi, fetchKota, fetchKecamatan, fetchKelurahan } = useWilayah()
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

const loading = ref(true)
const submitting = ref(false)
const provinsis = ref([])
const kotas = ref([])
const kecamatans = ref([])
const kelurahans = ref([])
const mgmps = ref([])
const previewUrl = ref(null)
const originalFoto = ref(null)
const errors = ref({})

const form = reactive({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  nik: '',
  full_name: '',
  gender: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  alamat: '',
  rt: '',
  rw: '',
  provinsi_id: '',
  kota_id: '',
  kecamatan_id: '',
  kelurahan_id: '',
  no_hp: '',
  foto: null,
  mgmp_id: '',
  nuptk: '',
  nrg: '',
  nip: '',
  gelar_depan: '',
  gelar_belakang: '',
  status_guru: 'aktif'
})

const getStorageUrl = (path) => {
    if (!path) return null
    const baseUrl = config.public.apiBase.replace('/api', '')
    return `${baseUrl}/storage/${path}`
}

onMounted(async () => {
  try {
    const [provRes, mgmpRes, teacherRes] = await Promise.all([
      fetchProvinsi(),
      get('/admin/mgmp-list'),
      get(`/sekolah/guru/${route.params.id}`)
    ])
    
    provinsis.value = provRes
    mgmps.value = mgmpRes
    
    const guru = teacherRes.data
    console.log('PIC Editing teacher:', guru)

    form.username = guru.user.username
    form.email = guru.user.email
    form.nik = guru.user.person.nik
    form.full_name = guru.user.person.full_name
    form.gender = guru.user.person.gender
    form.tempat_lahir = guru.user.person.tempat_lahir
    form.tanggal_lahir = guru.user.person.tanggal_lahir
    form.alamat = guru.user.person.alamat
    form.rt = guru.user.person.rt
    form.rw = guru.user.person.rw
    form.provinsi_id = guru.user.person.provinsi_id
    form.kota_id = guru.user.person.kota_id
    form.kecamatan_id = guru.user.person.kecamatan_id
    form.kelurahan_id = guru.user.person.kelurahan_id
    form.no_hp = guru.user.person.no_hp
    originalFoto.value = guru.user.person.foto
    
    form.mgmp_id = guru.mgmp_id
    form.nuptk = guru.nuptk
    form.nrg = guru.nrg
    form.nip = guru.nip
    form.gelar_depan = guru.gelar_depan
    form.gelar_belakang = guru.gelar_belakang
    
    if (guru.sekolah && guru.sekolah.length > 0) {
        form.status_guru = guru.sekolah[0].pivot?.status || 'aktif'
    }

    // Load dependent wilayah data sequentially
    if (form.provinsi_id) kotas.value = await fetchKota(form.provinsi_id)
    if (form.kota_id) kecamatans.value = await fetchKecamatan(form.kota_id)
    if (form.kecamatan_id) kelurahans.value = await fetchKelurahan(form.kecamatan_id)

  } catch (error) {
    console.error('Failed to load initial data:', error)
    showAlert({ title: 'Gagal!', text: 'Data guru tidak ditemukan.', icon: 'error' })
    router.push('/sekolah/guru')
  } finally {
    loading.value = false
  }
})

const onProvinsiChange = async () => {
  form.kota_id = ''
  form.kecamatan_id = ''
  form.kelurahan_id = ''
  kotas.value = await fetchKota(form.provinsi_id)
}

const onKotaChange = async () => {
  form.kecamatan_id = ''
  form.kelurahan_id = ''
  kecamatans.value = await fetchKecamatan(form.kota_id)
}

const onKecamatanChange = async () => {
  form.kelurahan_id = ''
  kelurahans.value = await fetchKelurahan(form.kecamatan_id)
}

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.foto = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const submitForm = async () => {
  submitting.value = true
  errors.value = {}

  try {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    
    for (const key in form) {
      if (form[key] !== null && form[key] !== '') {
        formData.append(key, form[key])
      }
    }

    await fetchapi(`/sekolah/guru/${route.params.id}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })

    showAlert({
      title: 'Berhasil!',
      text: 'Data guru telah diperbarui.',
      icon: 'success',
      timer: 1500
    })
    
    router.push('/sekolah/guru')
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
        text: error.data?.message || 'Terjadi kesalahan saat menyimpan data guru.',
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
