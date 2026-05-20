<template>
  <section class="py-24 bg-white" id="faq">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16">
        
        <div>
          <h2 class="text-3xl font-bold mb-6">Pertanyaan Umum (FAQ)</h2>
          <p class="text-gray-600 mb-8 font-medium italic">Kami senang mendengar dari Anda[cite: 41].</p>
          <div class="space-y-4 text-left">
            <div v-for="faq in faqs" :key="faq.q" class="border-b border-gray-100 pb-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition">
              <h4 class="font-bold text-gray-900 flex justify-between items-center text-sm">
                {{ faq.q }} <Icon name="ph:caret-down-bold" />
              </h4>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-3xl p-8 lg:p-12 text-white">
          <h2 class="text-2xl font-bold mb-6">Hubungi Kami [cite: 45]</h2>
          <form class="space-y-4">
            <input type="text" placeholder="Nama Lengkap" class="w-full px-4 py-3 rounded-xl bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 text-sm">
            <input type="email" placeholder="Email Sekolah" class="w-full px-4 py-3 rounded-xl bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 text-sm">
            <textarea placeholder="Pesan Anda" rows="4" class="w-full px-4 py-3 rounded-xl bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 text-sm"></textarea>
            <button class="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition">Kirim Pesan</button>
          </form>
          <p class="mt-6 text-xs text-gray-400 flex items-center gap-2">
            <Icon name="ph:phone-call-fill" /> Dukungan teknis tersedia 24/7[cite: 11].
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const faqs = [
  { q: "Bagaimana cara migrasi data dari sistem lama?" },
  { q: "Apakah tersedia pelatihan untuk para guru?" },
  { q: "Bisakah saya mengubah paket di tengah jalan?" },
  { q: "Data sekolah disimpan di mana?" }
]
</script>