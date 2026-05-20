export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('access_token')
    const userRole = useCookie('user_role') // Simpan role di cookie saat login

    // 1. Cek apakah sudah login
    if (!token.value) {
        return navigateTo('/login')
    }

    // 2. Ambil requirement role dari meta halaman yang dituju
    const allowedRoles = to.meta.allowedRoles as string[]

    // 3. Cek apakah role user diizinkan mengakses halaman ini
    if (allowedRoles && !allowedRoles.includes(userRole.value as string)) {
        // Jika tidak punya akses, lempar ke halaman yang sesuai rolenya
        if (userRole.value === 'admin') return navigateTo('/admin')
        if (userRole.value === 'guru') return navigateTo('/guru')
        if (userRole.value === 'pic') return navigateTo('/sekolah')
        if (userRole.value === 'siswa') return navigateTo('/siswa')

        return navigateTo('/login')
    }
})