<template>
    <NuxtLayout name="admin">
        <div
            class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
            <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">User Profile</h1>
            <nav class="flex items-center space-x-2 text-sm">
                <NuxtLink to="/admin" class="text-blue-500 hover:underline">Admin</NuxtLink>
                <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
                <span class="text-slate-500 dark:text-slate-400">Profile</span>
            </nav>
        </div>

        <div v-if="pending" class="p-6 text-center text-slate-500">
            Mengambil data profil...
        </div>

        <div v-else-if="user" class="p-6">
            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-12 lg:col-span-4">
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6 text-center">
                        <div class="relative inline-block mb-4">
                            <img :src="user.person?.foto || `https://ui-avatars.com/api/?name=${user.person?.full_name || user.username}&background=0D8ABC&color=fff`"
                                class="w-32 h-32 rounded-full border-4 border-slate-50 dark:border-slate-700 shadow-md object-cover"
                                alt="Profile Photo" />
                            <button
                                class="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg">
                                <Icon name="ph:camera-bold" size="16" />
                            </button>
                        </div>
                        <h2 class="text-xl font-bold text-slate-800 dark:text-white">{{ user.person?.full_name || 'User'
                        }}</h2>
                        <span
                            class="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/30 dark:text-blue-400 font-bold uppercase tracking-wider">
                            {{ user.role?.role || 'User' }}
                        </span>

                        <div class="mt-8 text-left space-y-4">
                            <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account
                                Information</h3>
                            <div class="flex items-center gap-3">
                                <Icon name="ph:user-circle-bold" class="text-slate-400" size="20" />
                                <div>
                                    <p class="text-xs text-slate-400">Username</p>
                                    <p class="text-sm font-medium text-slate-700 dark:text-slate-200">@{{ user.username
                                    }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <Icon name="ph:envelope-simple-bold" class="text-slate-400" size="20" />
                                <div>
                                    <p class="text-xs text-slate-400">Email Address</p>
                                    <p class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ user.email }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <Icon name="ph:phone-bold" class="text-slate-400" size="20" />
                                <div>
                                    <p class="text-xs text-slate-400">Nomor HP</p>
                                    <p class="text-sm font-medium text-slate-700 dark:text-slate-200">{{
                                        user.person?.no_hp || '-' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 lg:col-span-8">
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden">
                        <div
                            class="flex border-b dark:border-slate-700 overflow-x-auto bg-slate-50/50 dark:bg-slate-800/50">
                            <button @click="activeTab = 'profile'"
                                :class="activeTab === 'profile' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'"
                                class="px-6 py-4 font-medium text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
                                <Icon name="ph:user-bold" /> Profile Data
                            </button>
                            <button @click="activeTab = 'security'"
                                :class="activeTab === 'security' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'"
                                class="px-6 py-4 font-medium text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
                                <Icon name="ph:lock-bold" /> Security
                            </button>
                        </div>

                        <div class="p-6">
                            <div v-if="activeTab === 'profile'" class="space-y-6 animate-fade-in">
                                <div class="flex justify-between items-center pb-4 border-b dark:border-slate-700">
                                    <h3
                                        class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                                        Personal Details
                                    </h3>
                                    <button @click="toggleEdit"
                                        :class="isEditing ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700'"
                                        class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2">
                                        <Icon :name="isEditing ? 'ph:x-bold' : 'ph:pencil-simple-bold'" size="14" />
                                        {{ isEditing ? 'Cancel' : 'Edit Profile' }}
                                    </button>
                                </div>

                                <form @submit.prevent="updateProfile" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="flex flex-col gap-2">
                                        <label class="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                                        <input type="text" v-model="form.full_name" :disabled="!isEditing"
                                            class="form-input-custom"
                                            :class="{ 'bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed': !isEditing }" />
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label class="text-xs font-bold text-slate-500 uppercase">NIK / ID
                                            Number</label>
                                        <input type="text" v-model="form.nik" :disabled="!isEditing"
                                            class="form-input-custom"
                                            :class="{ 'bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed': !isEditing }" />
                                    </div>

                                    <!-- View Mode Fields -->
                                    <template v-if="!isEditing">
                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Tempat Tanggal Lahir</label>
                                            <div class="form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed">
                                                {{ tempat_tanggal_lahir }}
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                                            <div class="form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed">
                                                {{ gender }}
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Nomor HP</label>
                                            <div class="form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed">
                                                {{ user.person?.no_hp || '-' }}
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-2 md:col-span-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                                            <div class="form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed min-h-[60px]">
                                                {{ user.person?.alamat_lengkap || '-' }}
                                            </div>
                                        </div>
                                    </template>

                                    <!-- Edit Mode Fields -->
                                    <template v-else>
                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Tempat Lahir</label>
                                            <input type="text" v-model="form.tempat_lahir" class="form-input-custom" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                                            <input type="date" v-model="form.tanggal_lahir" class="form-input-custom" />
                                        </div>

                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                                            <select v-model="form.gender" class="form-input-custom">
                                                <option value="L">Laki-laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Nomor HP</label>
                                            <input type="text" v-model="form.no_hp" class="form-input-custom" />
                                        </div>

                                        <div class="flex flex-col gap-2 md:col-span-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Alamat Jalan</label>
                                            <textarea rows="2" v-model="form.alamat" class="form-input-custom"></textarea>
                                        </div>

                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="flex flex-col gap-2">
                                                <label class="text-xs font-bold text-slate-500 uppercase">RT</label>
                                                <input type="text" v-model="form.rt" placeholder="000" class="form-input-custom" />
                                            </div>
                                            <div class="flex flex-col gap-2">
                                                <label class="text-xs font-bold text-slate-500 uppercase">RW</label>
                                                <input type="text" v-model="form.rw" placeholder="000" class="form-input-custom" />
                                            </div>
                                        </div>

                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Provinsi</label>
                                            <select v-model="form.provinsi_id" @change="fetchKota" class="form-input-custom">
                                                <option value="">Pilih Provinsi</option>
                                                <option v-for="item in provinsis" :key="item.id" :value="item.id">{{
                                                    item.nama_provinsi }}</option>
                                            </select>
                                        </div>

                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Kota / Kabupaten</label>
                                            <select v-model="form.kota_id" :disabled="!form.provinsi_id" @change="fetchKecamatan"
                                                class="form-input-custom" :class="{ 'bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed': !form.provinsi_id }">
                                                <option value="">Pilih Kota</option>
                                                <option v-for="item in kotas" :key="item.id" :value="item.id">{{
                                                    item.nama_kota }}</option>
                                            </select>
                                        </div>

                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Kecamatan</label>
                                            <select v-model="form.kecamatan_id" :disabled="!form.kota_id" @change="fetchKelurahan"
                                                class="form-input-custom" :class="{ 'bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed': !form.kota_id }">
                                                <option value="">Pilih Kecamatan</option>
                                                <option v-for="item in kecamatans" :key="item.id" :value="item.id">{{
                                                    item.nama_kecamatan }}</option>
                                            </select>
                                        </div>

                                        <div class="flex flex-col gap-2">
                                            <label class="text-xs font-bold text-slate-500 uppercase">Kelurahan / Desa</label>
                                            <select v-model="form.kelurahan_id" :disabled="!form.kecamatan_id" class="form-input-custom"
                                                :class="{ 'bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed': !form.kecamatan_id }">
                                                <option value="">Pilih Kelurahan</option>
                                                <option v-for="item in kelurahans" :key="item.id" :value="item.id">{{
                                                    item.nama_kelurahan }}</option>
                                            </select>
                                        </div>

                                        <div class="flex justify-end pt-4 border-t dark:border-slate-700 md:col-span-2">
                                            <button type="submit" :disabled="updating"
                                                class="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50">
                                                {{ updating ? 'Saving...' : 'Save Changes' }}
                                            </button>
                                        </div>
                                    </template>
                                </form>
                            </div>

                            <div v-if="activeTab === 'security'" class="space-y-6 animate-fade-in">
                                <div class="max-w-md space-y-4">
                                    <div class="flex flex-col gap-2">
                                        <label class="text-xs font-bold text-slate-500 uppercase">Current
                                            Password</label>
                                        <input type="password" placeholder="********" class="form-input-custom" />
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label class="text-xs font-bold text-slate-500 uppercase">New Password</label>
                                        <input type="password" placeholder="New password" class="form-input-custom" />
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label class="text-xs font-bold text-slate-500 uppercase">Confirm New
                                            Password</label>
                                        <input type="password" placeholder="Repeat new password"
                                            class="form-input-custom" />
                                    </div>
                                    <div class="pt-2">
                                        <button
                                            class="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
// import { c } from 'vue-router/dist/index-Bt5WDvfV.cjs'

definePageMeta({
    layout: false,
    middleware: 'role',
    allowedRoles: ['admin']
})

const { get, put, post } = useApi()
const { showAlert } = useAlert()
const activeTab = ref('profile')

// Menggunakan useAsyncData untuk kontrol lebih detail
const { data: user, pending, error } = await useAsyncData(
    'profile-me',
    () => get('/me'),
    {
        // Memastikan data person tidak null sebelum di-render
        transform: (data) => {
            if (!data.person) {
                data.person = {} // Fallback object kosong jika null
            }
            return data
        }
    }
)
// console.log('Data User:', user.value) // Debugging data user
const tempat_tanggal_lahir = computed(() => {
    if (user.value && user.value.person) {
        const tempat = user.value.person.tempat_lahir || 'Unknown'
        const tanggal = user.value.person.tanggal_lahir
            ? new Date(user.value.person.tanggal_lahir).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
            : 'Unknown'
        return `${tempat}, ${tanggal}`
    }
    return 'Unknown'
})
const ttl = tempat_tanggal_lahir.value
const gender = computed(() => {
    if (user.value && user.value.person) {
        return user.value.person.gender === 'L' ? 'Laki-laki' : 'Perempuan'
    }
    return 'Unknown'
})

// --- Form & Edit Logic ---
const { fetchProvinsi, fetchKota: getKotas, fetchKecamatan: getKecamatans, fetchKelurahan: getKelurahans } = useWilayah()
const isEditing = ref(false)
const updating = ref(false)
const provinsis = ref([])
const kotas = ref([])
const kecamatans = ref([])
const kelurahans = ref([])

const form = reactive({
    full_name: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    gender: '',
    no_hp: '',
    alamat: '',
    rt: '',
    rw: '',
    provinsi_id: '',
    kota_id: '',
    kecamatan_id: '',
    kelurahan_id: ''
})

// --- Regional Data Fetching ---
const fetchKota = async () => {
    kotas.value = await getKotas(form.provinsi_id)
}

const fetchKecamatan = async () => {
    kecamatans.value = await getKecamatans(form.kota_id)
}

const fetchKelurahan = async () => {
    kelurahans.value = await getKelurahans(form.kecamatan_id)
}

const initForm = () => {
    if (user.value && user.value.person) {
        const p = user.value.person
        form.full_name = p.full_name || ''
        form.nik = p.nik || ''
        form.tempat_lahir = p.tempat_lahir || ''
        form.tanggal_lahir = p.tanggal_lahir || ''
        form.gender = p.gender || 'L'
        form.no_hp = p.no_hp || ''
        form.alamat = p.alamat || ''
        form.rt = p.rt || ''
        form.rw = p.rw || ''
        form.provinsi_id = p.provinsi_id || ''
        form.kota_id = p.kota_id || ''
        form.kecamatan_id = p.kecamatan_id || ''
        form.kelurahan_id = p.kelurahan_id || ''

        // Pre-fetch cascaded data if IDs exist
        if (form.provinsi_id) fetchKota()
        if (form.kota_id) fetchKecamatan()
        if (form.kecamatan_id) fetchKelurahan()
    }
}

// Watch user data to initialize form
watch(user, (newVal) => {
    if (newVal) initForm()
}, { immediate: true })

const toggleEdit = async () => {
    if (!isEditing.value) {
        // Fetch provinces if not already loaded
        if (provinsis.value.length === 0) {
            provinsis.value = await fetchProvinsi()
        }
        initForm() // Reset to current user data
    }
    isEditing.value = !isEditing.value
}

const updateProfile = async () => {
    updating.value = true
    try {
        await post('/profile', {
            ...form
        })

        // Refresh data
        await refreshNuxtData('profile-me')
        isEditing.value = false
        showAlert({
            title: 'Berhasil!',
            text: 'Profil berhasil diperbarui!',
            icon: 'success',
            timer: 1500
        })
    } catch (e) {
        console.error('Failed to update profile', e)
        showAlert(e.data?.message || 'Terjadi kesalahan saat memperbarui profil.', 'error')
    } finally {
        updating.value = false
    }
}

// Menangani Error 500 dari Backend
if (error.value) {
    console.error('Pesan Error:', error.value.data?.message || error.value.message)
}
</script>

<style scoped>
.form-input-custom {
    @apply w-full p-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700 dark:text-slate-200;
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>