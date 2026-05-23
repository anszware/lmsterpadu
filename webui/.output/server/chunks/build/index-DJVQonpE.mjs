import __nuxt_component_0$1 from './index-ZpQ2fISz.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';
import 'pinia';
import 'vue-router';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$6 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" }, _attrs))}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10"><div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50"></div><div class="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-50"></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-bounce"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span> Brilliance in Execution </div><h1 class="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6"> Kelola Sekolah Lebih <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Cerdas &amp; Terintegrasi</span></h1><p class="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed"> Sistem Informasi Manajemen Sekolah terlengkap untuk mendukung digitalisasi pendidikan. Dari absensi hingga raport, semua dalam satu genggaman. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"><button class="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-200"> Mulai Sekarang </button><button class="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:play-circle-bold",
    class: "text-2xl text-blue-600"
  }, null, _parent));
  _push(` Lihat Demo </button></div><div class="mt-16 relative max-w-5xl mx-auto"><div class="rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl"><div class="rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:monitor-duotone",
    class: "text-9xl text-gray-300"
  }, null, _parent));
  _push(`<p class="absolute text-gray-400 font-medium">Dashboard Preview Placeholder</p></div></div></div></div></section>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/hero.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$4]]), { __name: "LandingHero" });
const _sfc_main$5 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-12 bg-white" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-2 md:grid-cols-4 gap-8 bg-blue-600 rounded-3xl p-10 shadow-xl shadow-blue-200"><div class="text-center text-white"><div class="text-4xl font-bold mb-2">120+</div><div class="text-blue-100 text-sm">Sekolah Aktif</div></div><div class="text-center text-white"><div class="text-4xl font-bold mb-2">20K+</div><div class="text-blue-100 text-sm">Siswa Terdaftar</div></div><div class="text-center text-white"><div class="text-4xl font-bold mb-2">99%</div><div class="text-blue-100 text-sm">Kepuasan Guru</div></div><div class="text-center text-white"><div class="text-4xl font-bold mb-2">24/7</div><div class="text-blue-100 text-sm">Dukungan Teknis</div></div></div></div></section>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/statis.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]), { __name: "LandingStatis" });
const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "py-24 bg-gray-50",
    id: "fitur"
  }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan YNEX Edu</h2><p class="text-gray-600 max-w-2xl mx-auto">Dirancang dengan presisi untuk memenuhi kebutuhan manajemen pendidikan modern[cite: 12].</p></div><div class="grid md:grid-cols-3 gap-8"><div class="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition"><div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:layout-bold",
    size: "24"
  }, null, _parent));
  _push(`</div><h3 class="text-xl font-bold mb-3">Responsive Design</h3><p class="text-gray-600 text-sm leading-relaxed">Akses dashboard dari perangkat apa pun, kapan saja, dengan tampilan yang tetap optimal.</p></div><div class="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition"><div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:palette-bold",
    size: "24"
  }, null, _parent));
  _push(`</div><h3 class="text-xl font-bold mb-3">Mudah Dikustomisasi</h3><p class="text-gray-600 text-sm leading-relaxed">Ubah warna dan tema sistem dengan mudah sesuai dengan identitas sekolah Anda[cite: 15].</p></div><div class="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition"><div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:headset-bold",
    size: "24"
  }, null, _parent));
  _push(`</div><h3 class="text-xl font-bold mb-3">24/7 Support</h3><p class="text-gray-600 text-sm leading-relaxed">Tim bantuan kami siap mendampingi operasional sekolah Anda setiap saat[cite: 11].</p></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/features.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]), { __name: "LandingFeatures" });
const _sfc_main$3 = {
  __name: "LandingTeam",
  __ssrInlineRender: true,
  setup(__props) {
    const team = [
      { name: "Pater Parker", role: "Lead Developer" },
      { name: "Andrew Garlichd", role: "UI/UX Designer" },
      { name: "Jsem Taylor", role: "System Architect" },
      { name: "Elizabeth Ruse", role: "QA Engineer" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-24 bg-white" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 class="text-3xl font-bold mb-4">Tim di Balik Layanan Kami</h2><p class="text-gray-600 mb-16">Kolaborasi ahli untuk menghadirkan sistem terbaik bagi sekolah Anda.</p><div class="grid md:grid-cols-4 gap-8"><!--[-->`);
      ssrRenderList(team, (member) => {
        _push(`<div class="group"><div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-500 transition"><div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ph:user-bold",
          size: "48"
        }, null, _parent));
        _push(`</div></div><h3 class="font-bold text-lg text-gray-900">${ssrInterpolate(member.name)}</h3><p class="text-blue-600 text-sm">${ssrInterpolate(member.role)}</p></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/team.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_0$1;
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "py-24 bg-gray-50",
    id: "harga"
  }, _attrs))}><div class="max-w-7xl mx-auto px-4 text-center"><h2 class="text-3xl font-bold mb-4">Pilihan Paket Harga</h2><p class="text-gray-600 mb-16 italic">Harga terjangkau untuk setiap skala institusi[cite: 34].</p><div class="grid md:grid-cols-3 gap-8"><div class="bg-white p-8 rounded-3xl border border-gray-100 hover:scale-105 transition shadow-sm"><h3 class="font-bold text-xl mb-4 text-gray-700">BASIC</h3><div class="text-4xl font-black mb-6">$199<span class="text-lg font-normal text-gray-400">/tahun</span></div><ul class="text-left space-y-4 mb-8 text-gray-600 text-sm"><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Manajemen 500 Siswa</li><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Absensi Digital</li><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Support Email</li></ul><button class="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">Pilih Paket</button></div><div class="bg-white p-8 rounded-3xl border-2 border-blue-600 relative shadow-xl scale-110 z-10"><div class="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Populer</div><h3 class="font-bold text-xl mb-4 text-gray-700">ADVANCED</h3><div class="text-4xl font-black mb-6">$499<span class="text-lg font-normal text-gray-400">/tahun</span></div><ul class="text-left space-y-4 mb-8 text-gray-600 text-sm"><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Siswa Tak Terbatas</li><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Keuangan &amp; SPP</li><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Raport Digital</li></ul><button class="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Pilih Paket</button></div><div class="bg-white p-8 rounded-3xl border border-gray-100 hover:scale-105 transition shadow-sm"><h3 class="font-bold text-xl mb-4 text-gray-700">PREMIUM</h3><div class="text-4xl font-black mb-6">$1,299<span class="text-lg font-normal text-gray-400">/tahun</span></div><ul class="text-left space-y-4 mb-8 text-gray-600 text-sm"><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Semua Fitur Advanced</li><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Hosting Mandiri</li><li class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:check-circle-fill",
    class: "text-green-500"
  }, null, _parent));
  _push(` Support 24/7 Premium</li></ul><button class="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">Pilih Paket</button></div></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/pricing.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "LandingPricing" });
const _sfc_main$1 = {
  __name: "LandingContact",
  __ssrInlineRender: true,
  setup(__props) {
    const faqs = [
      { q: "Bagaimana cara migrasi data dari sistem lama?" },
      { q: "Apakah tersedia pelatihan untuk para guru?" },
      { q: "Bisakah saya mengubah paket di tengah jalan?" },
      { q: "Data sekolah disimpan di mana?" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "py-24 bg-white",
        id: "faq"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid lg:grid-cols-2 gap-16"><div><h2 class="text-3xl font-bold mb-6">Pertanyaan Umum (FAQ)</h2><p class="text-gray-600 mb-8 font-medium italic">Kami senang mendengar dari Anda[cite: 41].</p><div class="space-y-4 text-left"><!--[-->`);
      ssrRenderList(faqs, (faq) => {
        _push(`<div class="border-b border-gray-100 pb-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition"><h4 class="font-bold text-gray-900 flex justify-between items-center text-sm">${ssrInterpolate(faq.q)} `);
        _push(ssrRenderComponent(_component_Icon, { name: "ph:caret-down-bold" }, null, _parent));
        _push(`</h4></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-gray-900 rounded-3xl p-8 lg:p-12 text-white"><h2 class="text-2xl font-bold mb-6">Hubungi Kami [cite: 45]</h2><form class="space-y-4"><input type="text" placeholder="Nama Lengkap" class="w-full px-4 py-3 rounded-xl bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 text-sm"><input type="email" placeholder="Email Sekolah" class="w-full px-4 py-3 rounded-xl bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 text-sm"><textarea placeholder="Pesan Anda" rows="4" class="w-full px-4 py-3 rounded-xl bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 text-sm"></textarea><button class="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition">Kirim Pesan</button></form><p class="mt-6 text-xs text-gray-400 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, { name: "ph:phone-call-fill" }, null, _parent));
      _push(` Dukungan teknis tersedia 24/7[cite: 11]. </p></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/contact.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_LandingHero = __nuxt_component_0;
  const _component_LandingStatis = __nuxt_component_1;
  const _component_LandingFeatures = __nuxt_component_2;
  const _component_LandingTeam = _sfc_main$3;
  const _component_LandingPricing = __nuxt_component_4;
  const _component_LandingContact = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_LandingHero, { id: "hero" }, null, _parent));
  _push(ssrRenderComponent(_component_LandingStatis, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingFeatures, { id: "fitur" }, null, _parent));
  _push(ssrRenderComponent(_component_LandingTeam, null, null, _parent));
  _push(ssrRenderComponent(_component_LandingPricing, { id: "harga" }, null, _parent));
  _push(ssrRenderComponent(_component_LandingContact, { id: "faq" }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-DJVQonpE.mjs.map
