<template>
  <footer class="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="ph:graduation-cap-fill" class="text-white" />
            </div>
            <span class="font-bold text-xl tracking-tight">YNEX <span class="text-blue-600">Edu</span></span>
          </div>
          <p class="text-gray-500 text-sm leading-relaxed mb-6">
            Solusi digital terdepan untuk transformasi ekosistem pendidikan sekolah Anda menuju masa depan yang lebih cerdas.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 transition shadow-sm">
              <Icon name="ph:instagram-logo" />
            </a>
            <a href="#" class="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 transition shadow-sm">
              <Icon name="ph:linkedin-logo" />
            </a>
            <a href="#" class="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 transition shadow-sm">
              <Icon name="ph:youtube-logo" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Produk</h4>
          <ul class="space-y-4 text-sm text-gray-600">
            <li><a href="#" class="hover:text-blue-600 transition">Dashboard Guru</a></li>
            <li><a href="#" class="hover:text-blue-600 transition">Aplikasi Siswa</a></li>
            <li><a href="#" class="hover:text-blue-600 transition">Sistem Keuangan</a></li>
            <li><a href="#" class="hover:text-blue-600 transition">Update Terbaru</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Perusahaan</h4>
          <ul class="space-y-4 text-sm text-gray-600">
            <li><a href="#" class="hover:text-blue-600 transition">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-blue-600 transition">Karir</a></li>
            <li><a href="#" class="hover:text-blue-600 transition">Kebijakan Privasi</a></li>
            <li><a href="#" class="hover:text-blue-600 transition">Syarat & Ketentuan</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Berlangganan</h4>
          <p class="text-sm text-gray-500 mb-4">Dapatkan info terbaru seputar teknologi pendidikan.</p>
          <div class="flex">
            <input type="email" placeholder="Email" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
              <Icon name="ph:paper-plane-tilt-bold" />
            </button>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2024 YNEX Edu. Semua hak cipta dilindungi.</p>
        <div class="flex gap-6">
          <p class="flex items-center gap-1"><Icon name="ph:shield-check-fill" class="text-blue-500" /> Secure System</p>
          <p class="flex items-center gap-1"><Icon name="ph:globe-bold" class="text-blue-500" /> Cloud Hosting</p>
        </div>
      </div>
    </div>
  </footer>
</template>