<template>
  <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-bounce">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Brilliance in Execution
      </div>
      
      <h1 class="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
        Kelola Sekolah Lebih <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Cerdas & Terintegrasi</span>
      </h1>
      
      <p class="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
        Sistem Informasi Manajemen Sekolah terlengkap untuk mendukung digitalisasi pendidikan. Dari absensi hingga raport, semua dalam satu genggaman.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button class="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-200">
          Mulai Sekarang
        </button>
        <button class="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
          <Icon name="ph:play-circle-bold" class="text-2xl text-blue-600" />
          Lihat Demo
        </button>
      </div>

      <div class="mt-16 relative max-w-5xl mx-auto">
        <div class="rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl">
          <div class="rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
             <Icon name="ph:monitor-duotone" class="text-9xl text-gray-300" />
             <p class="absolute text-gray-400 font-medium">Dashboard Preview Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>