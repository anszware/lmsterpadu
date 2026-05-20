export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('access_token')

    // Jika token ada (sudah login), lempar balik ke halaman admin atau dashboard sesuai role
    if (token.value) {
        return navigateTo('/admin') // Sementara ke admin, nanti bisa dinamis
    }
})