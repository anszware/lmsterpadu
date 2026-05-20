<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold mb-4">Tim di Balik Layanan Kami</h2>
      <p class="text-gray-600 mb-16">Kolaborasi ahli untuk menghadirkan sistem terbaik bagi sekolah Anda.</p>
      
      <div class="grid md:grid-cols-4 gap-8">
        <div v-for="member in team" :key="member.name" class="group">
          <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-500 transition">
            <div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
               <Icon name="ph:user-bold" size="48" />
            </div>
          </div>
          <h3 class="font-bold text-lg text-gray-900">{{ member.name }}</h3>
          <p class="text-blue-600 text-sm">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const team = [
  { name: 'Pater Parker', role: 'Lead Developer' },
  { name: 'Andrew Garlichd', role: 'UI/UX Designer' },
  { name: 'Jsem Taylor', role: 'System Architect' },
  { name: 'Elizabeth Ruse', role: 'QA Engineer' }
]
</script>