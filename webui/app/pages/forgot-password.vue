<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-inter">
    
    <div class="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-slate-100">
      
      <div class="text-center mb-8">
        <div class="flex justify-center items-center gap-2 mb-4">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Icon name="ph:key-fill" class="text-white text-2xl" />
          </div>
          <span class="font-bold text-2xl tracking-tight text-slate-900">YNEX <span class="text-blue-600">Edu</span></span>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
        <p class="text-gray-400 text-sm leading-relaxed">
          Masukkan email Anda untuk menerima instruksi pengaturan ulang kata sandi.
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">

        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input 
            v-model="email"
            type="text" 
            id="email" 
            placeholder="Masukan alamat email yang telah terdaftar"
            class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 placeholder-gray-400 text-sm"
            :class="errorMessage ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'border-gray-200 focus:border-transparent'"
          >
          <p v-if="errorMessage" class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
            <Icon name="ph:warning-circle-fill" /> {{ errorMessage }}
          </p>
        </div>

        <button 
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 transform active:scale-[0.98]"
        >
          Kirim
        </button>
      </form>

      <div class="mt-8 text-center">
        <NuxtLink 
          to="/login" 
          class="text-sm text-gray-500 hover:text-blue-600 font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Icon name="ph:arrow-left-bold" /> Kembali ke Halaman Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const email = ref('')
const errorMessage = ref('')

// Fungsi validasi email sederhana
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const handleSubmit = () => {
  errorMessage.value = ''

  if (!email.value) {
    errorMessage.value = 'Masukan alamat email yang telah terdaftar'
  } else if (!validateEmail(email.value)) {
    errorMessage.value = 'Harap masukkan format email yang valid (contoh: user@gmail.com)'
  } else {
    // Logic kirim email ke backend
    alert('Instruksi telah dikirim ke email Anda!')
  }
}
</script>