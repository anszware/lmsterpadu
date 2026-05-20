<template>
  <section class="py-24 bg-gray-50" id="harga">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">Pilihan Paket Harga</h2>
      <p class="text-gray-600 mb-16 italic">Harga terjangkau untuk setiap skala institusi[cite: 34].</p>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-3xl border border-gray-100 hover:scale-105 transition shadow-sm">
          <h3 class="font-bold text-xl mb-4 text-gray-700">BASIC</h3>
          <div class="text-4xl font-black mb-6">$199<span class="text-lg font-normal text-gray-400">/tahun</span></div>
          <ul class="text-left space-y-4 mb-8 text-gray-600 text-sm">
            <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Manajemen 500 Siswa</li>
            <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Absensi Digital</li>
            <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Support Email</li>
          </ul>
          <button class="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">Pilih Paket</button>
        </div>

        <div class="bg-white p-8 rounded-3xl border-2 border-blue-600 relative shadow-xl scale-110 z-10">
          <div class="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Populer</div>
          <h3 class="font-bold text-xl mb-4 text-gray-700">ADVANCED</h3>
          <div class="text-4xl font-black mb-6">$499<span class="text-lg font-normal text-gray-400">/tahun</span></div>
          <ul class="text-left space-y-4 mb-8 text-gray-600 text-sm">
             <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Siswa Tak Terbatas</li>
             <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Keuangan & SPP</li>
             <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Raport Digital</li>
          </ul>
          <button class="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Pilih Paket</button>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-gray-100 hover:scale-105 transition shadow-sm">
          <h3 class="font-bold text-xl mb-4 text-gray-700">PREMIUM</h3>
          <div class="text-4xl font-black mb-6">$1,299<span class="text-lg font-normal text-gray-400">/tahun</span></div>
          <ul class="text-left space-y-4 mb-8 text-gray-600 text-sm">
            <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Semua Fitur Advanced</li>
            <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Hosting Mandiri</li>
            <li class="flex items-center gap-2"><Icon name="ph:check-circle-fill" class="text-green-500"/> Support 24/7 Premium</li>
          </ul>
          <button class="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">Pilih Paket</button>
        </div>
      </div>
    </div>
  </section>
</template>