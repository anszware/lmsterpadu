<template>
    <NuxtLayout name="admin">
        <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-inter">
            <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div
                    class="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="ph:user-gear-fill" size="40" />
                </div>

                <h1 class="text-2xl font-bold text-slate-900 mb-2">Halaman Admin</h1>
                <p class="text-slate-500 mb-8 text-sm">
                    Selamat datang
                </p>

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

</script>