import __nuxt_component_0 from './index-ZpQ2fISz.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import { mergeProps, ref, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main$2 = {
  __name: "LandingNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const isMenuOpen = ref(false);
    const menuItems = [
      { name: "Beranda", id: "hero" },
      { name: "Fitur", id: "fitur" },
      { name: "Harga", id: "harga" },
      { name: "FAQ", id: "faq" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 font-inter" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-20 items-center"><div class="flex-shrink-0 flex items-center gap-2 cursor-pointer"><div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ph:graduation-cap-fill",
        class: "text-white text-2xl"
      }, null, _parent));
      _push(`</div><span class="font-bold text-2xl tracking-tight text-gray-900">YNEX <span class="text-blue-600">Edu</span></span></div><div class="hidden md:flex space-x-10 text-sm font-semibold text-gray-600"><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<button class="hover:text-blue-600 transition-colors duration-300 relative group">${ssrInterpolate(item.name)} <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span></button>`);
      });
      _push(`<!--]--></div><div class="flex items-center gap-2 sm:gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-sm font-bold text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Masuk `);
          } else {
            return [
              createTextVNode(" Masuk ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 active:scale-95"> Coba Gratis </button><button class="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(isMenuOpen) ? "ph:x-bold" : "ph:list-bold",
        class: "text-2xl"
      }, null, _parent));
      _push(`</button></div></div></div>`);
      if (unref(isMenuOpen)) {
        _push(`<div class="md:hidden bg-white border-b border-gray-100 px-4 py-6 space-y-2 shadow-xl"><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<button class="block w-full text-left font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition">${ssrInterpolate(item.name)}</button>`);
        });
        _push(`<!--]--><div class="pt-4 mt-2 border-t border-gray-50">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "block w-full text-left font-bold text-gray-700 hover:text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Masuk ke Akun `);
            } else {
              return [
                createTextVNode(" Masuk ke Akun ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_0;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 pt-20 pb-10 border-t border-gray-100" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"><div class="col-span-1 md:col-span-1"><div class="flex items-center gap-2 mb-6"><div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:graduation-cap-fill",
    class: "text-white"
  }, null, _parent));
  _push(`</div><span class="font-bold text-xl tracking-tight">YNEX <span class="text-blue-600">Edu</span></span></div><p class="text-gray-500 text-sm leading-relaxed mb-6"> Solusi digital terdepan untuk transformasi ekosistem pendidikan sekolah Anda menuju masa depan yang lebih cerdas. </p><div class="flex gap-4"><a href="#" class="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 transition shadow-sm">`);
  _push(ssrRenderComponent(_component_Icon, { name: "ph:instagram-logo" }, null, _parent));
  _push(`</a><a href="#" class="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 transition shadow-sm">`);
  _push(ssrRenderComponent(_component_Icon, { name: "ph:linkedin-logo" }, null, _parent));
  _push(`</a><a href="#" class="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 transition shadow-sm">`);
  _push(ssrRenderComponent(_component_Icon, { name: "ph:youtube-logo" }, null, _parent));
  _push(`</a></div></div><div><h4 class="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Produk</h4><ul class="space-y-4 text-sm text-gray-600"><li><a href="#" class="hover:text-blue-600 transition">Dashboard Guru</a></li><li><a href="#" class="hover:text-blue-600 transition">Aplikasi Siswa</a></li><li><a href="#" class="hover:text-blue-600 transition">Sistem Keuangan</a></li><li><a href="#" class="hover:text-blue-600 transition">Update Terbaru</a></li></ul></div><div><h4 class="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Perusahaan</h4><ul class="space-y-4 text-sm text-gray-600"><li><a href="#" class="hover:text-blue-600 transition">Tentang Kami</a></li><li><a href="#" class="hover:text-blue-600 transition">Karir</a></li><li><a href="#" class="hover:text-blue-600 transition">Kebijakan Privasi</a></li><li><a href="#" class="hover:text-blue-600 transition">Syarat &amp; Ketentuan</a></li></ul></div><div><h4 class="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Berlangganan</h4><p class="text-sm text-gray-500 mb-4">Dapatkan info terbaru seputar teknologi pendidikan.</p><div class="flex"><input type="email" placeholder="Email" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"><button class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">`);
  _push(ssrRenderComponent(_component_Icon, { name: "ph:paper-plane-tilt-bold" }, null, _parent));
  _push(`</button></div></div></div><div class="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400"><p>© 2024 YNEX Edu. Semua hak cipta dilindungi.</p><div class="flex gap-6"><p class="flex items-center gap-1">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:shield-check-fill",
    class: "text-blue-500"
  }, null, _parent));
  _push(` Secure System</p><p class="flex items-center gap-1">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ph:globe-bold",
    class: "text-blue-500"
  }, null, _parent));
  _push(` Cloud Hosting</p></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "LandingFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_LandingNavbar = _sfc_main$2;
  const _component_LandingFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans antialiased text-gray-900" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_LandingNavbar, null, null, _parent));
  _push(`<main>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_LandingFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CZlVS_YO.mjs.map
