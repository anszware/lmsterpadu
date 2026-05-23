import __nuxt_component_0 from './index-ZpQ2fISz.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import { ref, reactive, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const showPassword = ref(false);
    const form = reactive({
      username: "",
      password: ""
    });
    const errors = reactive({
      username: false,
      password: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen w-full flex items-center justify-center bg-slate-50 p-4" }, _attrs))}><div class="w-full max-w-[440px] bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100"><div class="text-center mb-10"><div class="flex justify-center items-center gap-2 mb-4"><div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ph:graduation-cap-fill",
        class: "text-white text-2xl"
      }, null, _parent));
      _push(`</div><span class="font-bold text-2xl tracking-tight text-slate-900">YNEX <span class="text-blue-600">Edu</span></span></div><h2 class="text-2xl font-bold text-slate-900">Sign In</h2><p class="mt-2 text-sm text-slate-500">Welcome back! Please enter your details.</p></div><form class="space-y-6"><div class="space-y-5"><div><label for="username" class="block text-sm font-semibold text-slate-700 mb-2">Username or Email</label><input${ssrRenderAttr("value", unref(form).username)} id="username" type="text" class="${ssrRenderClass([unref(errors).username ? "border-red-500 focus:ring-red-200 bg-red-50" : "border-slate-200 focus:ring-blue-100 focus:border-blue-500", "block w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:outline-none text-sm"])}" placeholder="Enter username or email">`);
      if (unref(errors).username) {
        _push(`<p class="mt-1 text-[11px] text-red-500 font-medium">masukan username atau email</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><div class="flex justify-between items-center mb-2"><label for="password" class="block text-sm font-semibold text-slate-700">Password</label>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/forgot-password",
        class: "text-xs font-bold text-blue-600 hover:text-blue-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Forget password?`);
          } else {
            return [
              createTextVNode(" Forget password?")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative flex items-center"><input${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)} id="password"${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} class="${ssrRenderClass([unref(errors).password ? "border-red-500 focus:ring-red-200 bg-red-50" : "border-slate-200 focus:ring-blue-100 focus:border-blue-500", "block w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:outline-none pr-12 text-sm"])}" placeholder="••••••••••"><button type="button" class="absolute right-4 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(showPassword) ? "ph:eye-slash-bold" : "ph:eye-bold",
        size: "18"
      }, null, _parent));
      _push(`</button></div>`);
      if (unref(errors).password) {
        _push(`<p class="mt-1 text-[11px] text-red-500 font-medium">Harap masukan password</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="space-y-6"><div class="flex items-center"><input id="remember" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"><label for="remember" class="ml-2 block text-sm text-slate-600 cursor-pointer">Remember password?</label></div><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-80 cursor-not-allowed": unref(isLoading) }, "w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 shadow-lg shadow-blue-100 transform active:scale-[0.98] flex items-center justify-center gap-2"])}">`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "ph:circle-notch-bold",
          class: "animate-spin text-xl"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span>${ssrInterpolate(unref(isLoading) ? "Memproses..." : "Sign In")}</span></button></div><div class="mt-8 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-sm text-gray-500 hover:text-blue-600 font-semibold flex items-center justify-center gap-2 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, { name: "ph:arrow-left-bold" }, null, _parent2, _scopeId));
            _push2(` Kembali ke Landing Page `);
          } else {
            return [
              createVNode(_component_Icon, { name: "ph:arrow-left-bold" }),
              createTextVNode(" Kembali ke Landing Page ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-BQLRCBQr.mjs.map
