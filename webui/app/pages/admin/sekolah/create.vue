<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Tambah Sekolah</h1>
      <nav class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/admin" class="text-blue-500 hover:underline">Admin</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <NuxtLink to="/admin/sekolah" class="text-blue-500 hover:underline">Sekolah</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-500 dark:text-slate-400">Tambah</span>
      </nav>
    </div>

    <div class="p-6">
      <!-- Wizard Stepper -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="flex items-center justify-between relative">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 z-0"></div>
          <div 
            class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 z-0"
            :style="{ width: ((step - 1) / 2 * 100) + '%' }"
          ></div>

          <div v-for="s in 3" :key="s" class="relative z-10">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4"
              :class="[
                step >= s 
                  ? 'bg-blue-600 border-blue-100 dark:border-blue-900/30 text-white' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              ]"
            >
              <Icon v-if="step > s" name="ph:check-bold" />
              <span v-else>{{ s }}</span>
            </div>
            <div 
              class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
              :class="step >= s ? 'text-blue-600' : 'text-slate-400'"
            >
              {{ stepLabels[s-1] }}
            </div>
          </div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700 overflow-hidden">
          
          <!-- STEP 1: DATA SEKOLAH -->
          <div v-show="step === 1" class="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4">Informasi Dasar Sekolah</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NPSN</label>
                <input v-model="form.npsn" type="text" placeholder="Masukkan NPSN" class="form-input-custom" required />
                <p v-if="errors.npsn" class="text-[10px] text-rose-500 mt-1">{{ errors.npsn[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nama Sekolah</label>
                <input v-model="form.nama_sekolah" type="text" placeholder="Nama Sekolah" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Jenjang</label>
                <select v-model="form.jenjang" class="form-input-custom" required>
                  <option value="">Pilih Jenjang</option>
                  <option value="sd">SD</option>
                  <option value="mi">MI</option>
                  <option value="smp">SMP</option>
                  <option value="mts">MTS</option>
                  <option value="sma">SMA</option>
                  <option value="ma">MA</option>
                  <option value="smk">SMK</option>
                  <option value="mak">MAK</option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Jenis Sekolah</label>
                <select v-model="form.jenis_sekolah" class="form-input-custom" required>
                  <option value="">Pilih Jenis</option>
                  <option value="negeri">Negeri</option>
                  <option value="swasta">Swasta</option>
                </select>
              </div>

              <div class="col-span-full flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                <textarea v-model="form.alamat_sekolah" rows="2" placeholder="Jl. Contoh No. 123" class="form-input-custom" required></textarea>
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

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Logo Sekolah</label>
                <div class="flex items-center gap-4">
                  <img v-if="previewLogo" :src="previewLogo" class="w-12 h-12 rounded object-cover border" />
                  <div v-else class="w-12 h-12 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-dashed">
                    <Icon name="ph:image-square-bold" class="text-slate-400" />
                  </div>
                  <input type="file" @change="handleLogoUpload" accept="image/*" class="text-xs text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2: DATA PIC -->
          <div v-show="step === 2" class="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4">Informasi Akun PIC</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Username</label>
                <input v-model="form.pic_username" type="text" placeholder="username" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input v-model="form.pic_email" type="email" placeholder="pic@example.com" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Password</label>
                <input v-model="form.pic_password" type="password" placeholder="********" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NIK (16 Digit)</label>
                <input v-model="form.pic_nik" type="text" placeholder="32xxxxxxxxxxxxxx" class="form-input-custom" required maxlength="16" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                <input v-model="form.pic_full_name" type="text" placeholder="Nama Lengkap" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                <select v-model="form.pic_gender" class="form-input-custom" required>
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nomor HP</label>
                <input v-model="form.pic_no_hp" type="text" placeholder="08xxxxxxxxxx" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Tempat Lahir</label>
                <input v-model="form.pic_tempat_lahir" type="text" placeholder="Kota Lahir" class="form-input-custom" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                <input v-model="form.pic_tanggal_lahir" type="date" class="form-input-custom" required />
              </div>

              <div class="col-span-full flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Alamat PIC</label>
                <textarea v-model="form.pic_alamat" rows="2" placeholder="Sama dengan alamat sekolah atau alamat pribadi" class="form-input-custom" required></textarea>
              </div>
            </div>
          </div>

          <!-- STEP 3: REVIEW -->
          <div v-show="step === 3" class="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4 mb-4">Review Pendaftaran</h3>
              <p class="text-sm text-slate-500">Pastikan semua data di bawah ini sudah benar sebelum menyimpan.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <div class="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                  <Icon name="ph:school-bold" size="20" />
                  Data Sekolah
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3">
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">NPSN</span>
                    <span class="text-sm font-medium">{{ form.npsn }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Nama</span>
                    <span class="text-sm font-medium">{{ form.nama_sekolah }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Jenjang</span>
                    <span class="text-sm font-medium uppercase">{{ form.jenjang }} ({{ form.jenis_sekolah }})</span>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                  <Icon name="ph:user-circle-gear-bold" size="20" />
                  Data PIC
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3">
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Username</span>
                    <span class="text-sm font-medium">{{ form.pic_username }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Nama Lengkap</span>
                    <span class="text-sm font-medium">{{ form.pic_full_name }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Email</span>
                    <span class="text-sm font-medium">{{ form.pic_email }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3">
              <Icon name="ph:info-bold" class="text-blue-600 flex-shrink-0" size="20" />
              <p class="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                Menyimpan data ini akan otomatis membuat akun user dengan role <strong>PIC</strong> dan menghubungkannya dengan sekolah yang didaftarkan.
              </p>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-between items-center">
            <button 
              type="button"
              @click="prevStep"
              v-show="step > 1"
              class="px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Icon name="ph:arrow-left-bold" />
              Sebelumnya
            </button>
            <div v-show="step === 1"></div> <!-- Spacer -->

            <div class="flex gap-3">
              <NuxtLink to="/admin/sekolah" class="px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all">
                Batal
              </NuxtLink>
              
              <button 
                v-if="step < 3"
                type="button"
                @click="nextStep"
                class="bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                Selanjutnya
                <Icon name="ph:arrow-right-bold" />
              </button>

              <button 
                v-else
                type="button" 
                @click="submitForm"
                :disabled="submitting" 
                class="bg-blue-600 text-white px-10 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <Icon v-if="submitting" name="ph:circle-notch-bold" class="animate-spin" />
                Daftarkan Sekarang
              </button>
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

const router = useRouter()
const { fetchapi } = useApi()
const { showAlert } = useAlert()
const { fetchProvinsi, fetchKota, fetchKecamatan, fetchKelurahan } = useWilayah()

const step = ref(1)
const stepLabels = ['Data Sekolah', 'Data PIC', 'Selesai']
const submitting = ref(false)
const errors = ref({})

const provinsis = ref([])
const kotas = ref([])
const kecamatans = ref([])
const kelurahans = ref([])
const previewLogo = ref(null)

const form = reactive({
  // Sekolah
  npsn: '',
  nama_sekolah: '',
  alamat_sekolah: '',
  provinsi_id: '',
  kota_id: '',
  kecamatan_id: '',
  kelurahan_id: '',
  jenjang: '',
  jenis_sekolah: '',
  logo_sekolah: null,
  
  // PIC User
  pic_username: '',
  pic_email: '',
  pic_password: '',
  
  // PIC Person
  pic_nik: '',
  pic_full_name: '',
  pic_gender: '',
  pic_no_hp: '',
  pic_tempat_lahir: '',
  pic_tanggal_lahir: '',
  pic_alamat: '',
  pic_foto: null
})

onMounted(async () => {
  provinsis.value = await fetchProvinsi()
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

const handleLogoUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.logo_sekolah = file
    previewLogo.value = URL.createObjectURL(file)
  }
}

const nextStep = () => {
  if (step.value < 3) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const submitForm = async () => {
  submitting.value = true
  errors.value = {}

  try {
    const formData = new FormData()
    
    // Append all form fields
    for (const key in form) {
      if (form[key] !== null && form[key] !== '') {
        formData.append(key, form[key])
      }
    }

    const token = useCookie('access_token')
    await fetchapi('/admin/sekolah', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`
      }
    })

    showAlert({
      title: 'Berhasil!',
      text: 'Sekolah dan PIC telah didaftarkan.',
      icon: 'success',
      timer: 1500
    })
    
    router.push('/admin/sekolah')
  } catch (error) {
    if (error.status === 422) {
      errors.value = error.data?.errors || {}
      step.value = 1 // Go back to show errors if any (simple logic)
      showAlert({
        title: 'Validasi Gagal!',
        text: 'Mohon periksa kembali inputan Anda.',
        icon: 'error'
      })
    } else {
      showAlert({
        title: 'Gagal!',
        text: error.data?.message || 'Terjadi kesalahan saat mendaftarkan sekolah.',
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
