<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Edit User</h1>
      <nav class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/admin" class="text-blue-500 hover:underline">Admin</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <NuxtLink to="/admin/users" class="text-blue-500 hover:underline">User</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-500 dark:text-slate-400">Edit</span>
      </nav>
    </div>

    <div v-if="loading" class="p-12 text-center text-slate-500">
      Memuat data user...
    </div>

    <div v-else class="p-6">
      <form @submit.prevent="submitForm" class="grid grid-cols-12 gap-6">
        <!-- Akun User -->
        <div class="col-span-12 lg:col-span-4 space-y-6">
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
            <h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700">
              Informasi Akun
            </h3>
            
            <div class="space-y-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Username</label>
                <input v-model="form.username" type="text" placeholder="username" class="form-input-custom" required />
                <p v-if="errors.username" class="text-[10px] text-rose-500 mt-1">{{ errors.username[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input v-model="form.email" type="email" placeholder="user@example.com" class="form-input-custom" required />
                <p v-if="errors.email" class="text-[10px] text-rose-500 mt-1">{{ errors.email[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Password (Kosongkan jika tidak diubah)</label>
                <input v-model="form.password" type="password" placeholder="********" class="form-input-custom" />
                <p v-if="errors.password" class="text-[10px] text-rose-500 mt-1">{{ errors.password[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Role User</label>
                <select v-model="form.role_id" class="form-input-custom" required>
                  <option value="">Pilih Role</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.display_name || role.name }}</option>
                </select>
                <p v-if="errors.role_id" class="text-[10px] text-rose-500 mt-1">{{ errors.role_id[0] }}</p>
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
                  :src="previewUrl || 'https://ui-avatars.com/api/?name=' + form.full_name + '&background=0D8ABC&color=fff'" 
                  class="w-32 h-32 rounded-full border-4 border-slate-50 dark:border-slate-700 shadow-md object-cover" 
                />
                <label class="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg cursor-pointer transition-transform group-hover:scale-110">
                  <Icon name="ph:camera-bold" size="16" />
                  <input type="file" @change="handleFileUpload" class="hidden" accept="image/*" />
                </label>
              </div>
              <p class="text-[10px] text-slate-400 text-center">Format: JPG, PNG, Max 2MB</p>
            </div>
          </div>
        </div>

        <!-- Data Person -->
        <div class="col-span-12 lg:col-span-8">
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6">
            <h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700">
              Data Personal
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NIK (16 Digit)</label>
                <input v-model="form.nik" type="text" placeholder="32xxxxxxxxxxxxxx" class="form-input-custom" required maxlength="16" />
                <p v-if="errors.nik" class="text-[10px] text-rose-500 mt-1">{{ errors.nik[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
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
                <p v-if="errors.tempat_lahir" class="text-[10px] text-rose-500 mt-1">{{ errors.tempat_lahir[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                <input v-model="form.tanggal_lahir" type="date" class="form-input-custom" required />
                <p v-if="errors.tanggal_lahir" class="text-[10px] text-rose-500 mt-1">{{ errors.tanggal_lahir[0] }}</p>
              </div>

              <div class="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Alamat Jalan</label>
                <textarea v-model="form.alamat" rows="2" placeholder="Jl. Contoh No. 123" class="form-input-custom" required></textarea>
                <p v-if="errors.alamat" class="text-[10px] text-rose-500 mt-1">{{ errors.alamat[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">RT</label>
                <input v-model="form.rt" type="text" placeholder="001" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">RW</label>
                <input v-model="form.rw" type="text" placeholder="001" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Provinsi</label>
                <select v-model="form.provinsi_id" @change="onProvinsiChange" class="form-input-custom" required>
                  <option value="">Pilih Provinsi</option>
                  <option v-for="item in provinsis" :key="item.id" :value="item.id">{{ item.nama_provinsi }}</option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Kota / Kabupaten</label>
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
                <label class="text-xs font-bold text-slate-500 uppercase">Kelurahan / Desa</label>
                <select v-model="form.kelurahan_id" :disabled="!form.kecamatan_id" class="form-input-custom" required>
                  <option value="">Pilih Kelurahan</option>
                  <option v-for="item in kelurahans" :key="item.id" :value="item.id">{{ item.nama_kelurahan }}</option>
                </select>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t dark:border-slate-700 flex justify-end gap-3">
              <NuxtLink to="/admin/users" class="px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                Batal
              </NuxtLink>
              <button 
                type="submit" 
                :disabled="submitting" 
                class="bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
              >
                {{ submitting ? 'Menyimpan...' : 'Update User' }}
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
  allowedRoles: ['admin']
})

const route = useRoute()
const router = useRouter()
const { get, fetchapi } = useApi()
const { showAlert } = useAlert()
const { fetchProvinsi, fetchKota, fetchKecamatan, fetchKelurahan } = useWilayah()

const userId = route.params.id
const loading = ref(true)
const submitting = ref(false)
const roles = ref([])
const provinsis = ref([])
const kotas = ref([])
const kecamatans = ref([])
const kelurahans = ref([])
const previewUrl = ref(null)
const errors = ref({})

const form = reactive({
  username: '',
  email: '',
  password: '',
  role_id: '',
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
  foto: null
})

onMounted(async () => {
  try {
    const [rolesRes, provRes, userRes] = await Promise.all([
      get('/admin/roles'),
      fetchProvinsi(),
      get(`/admin/user/${userId}`)
    ])
    
    roles.value = rolesRes
    provinsis.value = provRes
    
    const user = userRes.data
    form.username = user.username
    form.email = user.email
    form.role_id = user.role?.id || ''
    
    if (user.person) {
      form.nik = user.person.nik
      form.full_name = user.person.full_name
      form.gender = user.person.gender
      form.tempat_lahir = user.person.tempat_lahir
      form.tanggal_lahir = user.person.tanggal_lahir
      form.alamat = user.person.alamat
      form.rt = user.person.rt
      form.rw = user.person.rw
      form.provinsi_id = user.person.provinsi_id
      form.kota_id = user.person.kota_id
      form.kecamatan_id = user.person.kecamatan_id
      form.kelurahan_id = user.person.kelurahan_id
      form.no_hp = user.person.no_hp
      previewUrl.value = user.person.foto
    }

    // Load cascaded data in parallel for speed
    const wilayahPromises = []
    if (form.provinsi_id) wilayahPromises.push(fetchKota(form.provinsi_id).then(res => kotas.value = res))
    if (form.kota_id) wilayahPromises.push(fetchKecamatan(form.kota_id).then(res => kecamatans.value = res))
    if (form.kecamatan_id) wilayahPromises.push(fetchKelurahan(form.kecamatan_id).then(res => kelurahans.value = res))
    
    if (wilayahPromises.length > 0) {
      await Promise.all(wilayahPromises)
    }

  } catch (error) {
    console.error('Failed to load user data:', error)
    showAlert({
      title: 'Error!',
      text: 'Gagal memuat data user.',
      icon: 'error'
    })
    router.push('/admin/users')
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
    
    // Append all form fields
    for (const key in form) {
      if (form[key] !== null && form[key] !== '') {
        // If password is empty, don't append it
        if (key === 'password' && form[key] === '') continue
        formData.append(key, form[key])
      }
    }

    const token = useCookie('access_token')
    await fetchapi(`/admin/user/${userId}`, {
      method: 'POST', // Use POST with _method=PUT for FormData support
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`
      }
    })

    showAlert({
      title: 'Berhasil!',
      text: 'Data user telah diperbarui.',
      icon: 'success',
      timer: 1500
    })
    
    router.push('/admin/users')
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
        text: error.data?.message || 'Terjadi kesalahan saat memperbarui user.',
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
