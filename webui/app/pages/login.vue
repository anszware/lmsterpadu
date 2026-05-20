<template>
    <div class="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">

        <div
            class="w-full max-w-[440px] bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">

            <div class="text-center mb-10">
                <div class="flex justify-center items-center gap-2 mb-4">
                    <div
                        class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <Icon name="ph:graduation-cap-fill" class="text-white text-2xl" />
                    </div>
                    <span class="font-bold text-2xl tracking-tight text-slate-900">YNEX <span
                            class="text-blue-600">Edu</span></span>
                </div>
                <h2 class="text-2xl font-bold text-slate-900">Sign In</h2>
                <p class="mt-2 text-sm text-slate-500">Welcome back! Please enter your details.</p>
            </div>

            <form class="space-y-6" @submit.prevent="handleLogin">
                <div class="space-y-5">
                    <div>
                        <label for="username" class="block text-sm font-semibold text-slate-700 mb-2">Username or
                            Email</label>
                        <input v-model="form.username" id="username" type="text"
                            class="block w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:outline-none text-sm"
                            :class="errors.username ? 'border-red-500 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'"
                            placeholder="Enter username or email" />
                        <p v-if="errors.username" class="mt-1 text-[11px] text-red-500 font-medium">masukan username
                            atau email</p>
                    </div>

                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label for="password" class="block text-sm font-semibold text-slate-700">Password</label>
                            <NuxtLink to="/forgot-password" class="text-xs font-bold text-blue-600 hover:text-blue-700">
                                Forget password?</NuxtLink>
                        </div>
                        <div class="relative flex items-center">
                            <input v-model="form.password" id="password" :type="showPassword ? 'text' : 'password'"
                                class="block w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:outline-none pr-12 text-sm"
                                :class="errors.password ? 'border-red-500 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'"
                                placeholder="••••••••••" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-4 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none">
                                <Icon :name="showPassword ? 'ph:eye-slash-bold' : 'ph:eye-bold'" size="18" />
                            </button>
                        </div>
                        <p v-if="errors.password" class="mt-1 text-[11px] text-red-500 font-medium">Harap masukan
                            password</p>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="flex items-center">
                        <input id="remember" type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer">
                        <label for="remember" class="ml-2 block text-sm text-slate-600 cursor-pointer">Remember
                            password?</label>
                    </div>

                    <button type="submit"
                        class="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 shadow-lg shadow-blue-100 transform active:scale-[0.98] flex items-center justify-center gap-2"
                        :disabled="isLoading" :class="{ 'opacity-80 cursor-not-allowed': isLoading }">
                        <Icon v-if="isLoading" name="ph:circle-notch-bold" class="animate-spin text-xl" />

                        <span>{{ isLoading ? 'Memproses...' : 'Sign In' }}</span>
                    </button>
                </div>
                <div class="mt-8 text-center">
                    <NuxtLink to="/"
                        class="text-sm text-gray-500 hover:text-blue-600 font-semibold flex items-center justify-center gap-2 transition-colors">
                        <Icon name="ph:arrow-left-bold" /> Kembali ke Landing Page
                    </NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false,
    middleware: 'guest'
})

const config = useRuntimeConfig()
const { toast } = useAlert() // Panggil composable alert
const isLoading = ref(false)

const showPassword = ref(false)
const form = reactive({
    username: '',
    password: ''
})

const errors = reactive({
    username: false,
    password: false
})

const handleLogin = async () => {
    // Reset error visual pada input
    errors.username = !form.username ? 'Masukan username atau email' : ''
    errors.password = !form.password ? 'Harap masukan password' : ''
    if (errors.username || errors.password) return
    isLoading.value = true
    try {
        const response = await $fetch('/login', {
            baseURL: config.public.apiBase,
            method: 'POST',
            body: {
                username: form.username,
                password: form.password
            },
            headers: {
                'Accept': 'application/json'
            }
        })
        // // HANDLE ERROR DARI SERVER
        // if (error.value) {
        //   const msg = error.value.data?.message || 'Terjadi kesalahan pada server'
        //   // Tampilkan SweetAlert Toast untuk error
        //   toast(msg, 'error')
        //   return
        // }

        // HANDLE SUCCESS
        // console.log('Respons Status:', response.status );
        // console.log('Respons Message:', response.message);
        // console.log('Respons Data:', JSON.stringify(response.user));
        if (response.status === 'success') {
            const token = useCookie('access_token')
            const userRole = useCookie('user_role') // Tambahkan cookie role
            const fullName = useCookie('user_name')

            token.value = response.access_token
            userRole.value = response.user.role.role // Mengambil 'admin', 'guru', dll
            fullName.value = response.user.person.full_name

            toast(`Selamat datang, ${fullName.value}`, 'success')
            // Redirect dinamis
            const targetPath = {
                admin: '/admin',
                guru: '/guru',
                pic: '/sekolah',
                siswa: '/siswa'
            }[userRole.value] || '/dashboard'

            // Logic Redirect berdasarkan role
            setTimeout(() => navigateTo(targetPath), 1500)
        }
    } catch (err) {
        // Di sinilah kita menangkap error dari Laravel (401, 404, 422, 500)

        // err.response._data berisi JSON yang dikirim Laravel saat error
        const serverResponse = err.response?._data;

        if (serverResponse && serverResponse.status === 'error') {
            // Ini akan menampilkan "Akun tidak ditemukan" atau "Password salah"
            // sesuai dengan isi property "message" dari JSON Laravel Anda
            toast(serverResponse.message, 'error');
        } else {
            // Jika terjadi error yang tidak terduga (misal server mati)
            toast('Gagal terhubung ke server. Silakan coba lagi.', 'error');
        }
    } finally {
        isLoading.value = false
    }
}
</script>