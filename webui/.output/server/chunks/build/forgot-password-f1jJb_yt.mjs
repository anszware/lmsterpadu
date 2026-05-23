import __nuxt_component_0 from './index-ZpQ2fISz.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './server.mjs';
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

const _sfc_main = {
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-100 min-h-screen flex items-center justify-center p-4 font-inter" }, _attrs))}><div class="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-slate-100"><div class="text-center mb-8"><div class="flex justify-center items-center gap-2 mb-4"><div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ph:key-fill",
        class: "text-white text-2xl"
      }, null, _parent));
      _push(`</div><span class="font-bold text-2xl tracking-tight text-slate-900">YNEX <span class="text-blue-600">Edu</span></span></div><h1 class="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1><p class="text-gray-400 text-sm leading-relaxed"> Masukkan email Anda untuk menerima instruksi pengaturan ulang kata sandi. </p></div><form class="space-y-6"><div><label for="email" class="block text-sm font-semibold text-gray-700 mb-2"> Email Address </label><input${ssrRenderAttr("value", unref(email))} type="text" id="email" placeholder="Masukan alamat email yang telah terdaftar" class="${ssrRenderClass([unref(errorMessage) ? "border-red-500 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:border-transparent", "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700 placeholder-gray-400 text-sm"])}">`);
      if (unref(errorMessage)) {
        _push(`<p class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, { name: "ph:warning-circle-fill" }, null, _parent));
        _push(` ${ssrInterpolate(unref(errorMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 transform active:scale-[0.98]"> Kirim </button></form><div class="mt-8 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-sm text-gray-500 hover:text-blue-600 font-semibold flex items-center justify-center gap-2 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "ph:arrow-left-bold" }, null, _parent2, _scopeId));
            _push2(` Kembali ke Halaman Login `);
          } else {
            return [
              createVNode(_component_Icon, { name: "ph:arrow-left-bold" }),
              createTextVNode(" Kembali ke Halaman Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgot-password-f1jJb_yt.mjs.map
