import { _ as _export_sfc, a as useRoute, b as useRouter, c as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import __nuxt_component_0$2 from './index-ZpQ2fISz.mjs';
import { ref, reactive, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, withModifiers, withDirectives, vModelText, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useApi } from './useApi-BTut_o5P.mjs';
import { u as useAlert } from './useAlert-CKkjru5E.mjs';
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
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@iconify/utils/lib/css/icon';
import './cookie-D7ajVlMO.mjs';
import 'sweetalert2';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { put } = useApi();
    const { showAlert } = useAlert();
    const jurusanId = route.params.id;
    const loading = ref(true);
    const submitting = ref(false);
    const errors = ref({});
    const form = reactive({
      kode_jurusan: "",
      nama_jurusan: "",
      deskripsi: ""
    });
    const submitForm = async () => {
      submitting.value = true;
      errors.value = {};
      try {
        await put(`/admin/jurusan/${jurusanId}`, form);
        showAlert({
          title: "Berhasil!",
          text: "Data jurusan telah diperbarui.",
          icon: "success",
          timer: 1500
        });
        router.push("/admin/jurusan");
      } catch (error) {
        if (error.status === 422) {
          errors.value = error.data?.errors || {};
          showAlert({
            title: "Validasi Gagal!",
            text: "Mohon periksa kembali inputan Anda.",
            icon: "error"
          });
        } else {
          showAlert({
            title: "Gagal!",
            text: error.data?.message || "Terjadi kesalahan saat memperbarui jurusan.",
            icon: "error"
          });
        }
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" data-v-aa6821cf${_scopeId}><h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize" data-v-aa6821cf${_scopeId}>Edit Jurusan</h1><nav class="flex items-center space-x-2 text-sm" data-v-aa6821cf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin",
              class: "text-blue-500 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Admin`);
                } else {
                  return [
                    createTextVNode("Admin")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:caret-right-bold",
              class: "text-slate-400",
              size: "12"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/jurusan",
              class: "text-blue-500 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Jurusan`);
                } else {
                  return [
                    createTextVNode("Jurusan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:caret-right-bold",
              class: "text-slate-400",
              size: "12"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-slate-500 dark:text-slate-400" data-v-aa6821cf${_scopeId}>Edit</span></nav></div>`);
            if (unref(loading)) {
              _push2(`<div class="p-12 text-center text-slate-500" data-v-aa6821cf${_scopeId}> Memuat data jurusan... </div>`);
            } else {
              _push2(`<div class="p-6" data-v-aa6821cf${_scopeId}><div class="max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6" data-v-aa6821cf${_scopeId}><form class="space-y-6" data-v-aa6821cf${_scopeId}><div class="flex flex-col gap-1.5" data-v-aa6821cf${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-aa6821cf${_scopeId}>Kode Jurusan</label><input${ssrRenderAttr("value", unref(form).kode_jurusan)} type="text" placeholder="Contoh: RPL, TKJ, AK" class="form-input-custom" required data-v-aa6821cf${_scopeId}>`);
              if (unref(errors).kode_jurusan) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-aa6821cf${_scopeId}>${ssrInterpolate(unref(errors).kode_jurusan[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-aa6821cf${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-aa6821cf${_scopeId}>Nama Jurusan</label><input${ssrRenderAttr("value", unref(form).nama_jurusan)} type="text" placeholder="Contoh: Rekayasa Perangkat Lunak" class="form-input-custom" required data-v-aa6821cf${_scopeId}>`);
              if (unref(errors).nama_jurusan) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-aa6821cf${_scopeId}>${ssrInterpolate(unref(errors).nama_jurusan[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-aa6821cf${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-aa6821cf${_scopeId}>Deskripsi</label><textarea rows="4" placeholder="Keterangan singkat tentang jurusan ini..." class="form-input-custom" data-v-aa6821cf${_scopeId}>${ssrInterpolate(unref(form).deskripsi)}</textarea>`);
              if (unref(errors).deskripsi) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-aa6821cf${_scopeId}>${ssrInterpolate(unref(errors).deskripsi[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="pt-4 border-t dark:border-slate-700 flex justify-end gap-3" data-v-aa6821cf${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/admin/jurusan",
                class: "px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Batal `);
                  } else {
                    return [
                      createTextVNode(" Batal ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50" data-v-aa6821cf${_scopeId}>${ssrInterpolate(unref(submitting) ? "Memperbarui..." : "Update Jurusan")}</button></div></form></div></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, [
                createVNode("h1", { class: "text-lg font-semibold text-slate-800 dark:text-white capitalize" }, "Edit Jurusan"),
                createVNode("nav", { class: "flex items-center space-x-2 text-sm" }, [
                  createVNode(_component_NuxtLink, {
                    to: "/admin",
                    class: "text-blue-500 hover:underline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Admin")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Icon, {
                    name: "ph:caret-right-bold",
                    class: "text-slate-400",
                    size: "12"
                  }),
                  createVNode(_component_NuxtLink, {
                    to: "/admin/jurusan",
                    class: "text-blue-500 hover:underline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Jurusan")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Icon, {
                    name: "ph:caret-right-bold",
                    class: "text-slate-400",
                    size: "12"
                  }),
                  createVNode("span", { class: "text-slate-500 dark:text-slate-400" }, "Edit")
                ])
              ]),
              unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "p-12 text-center text-slate-500"
              }, " Memuat data jurusan... ")) : (openBlock(), createBlock("div", {
                key: 1,
                class: "p-6"
              }, [
                createVNode("div", { class: "max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "flex flex-col gap-1.5" }, [
                      createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kode Jurusan"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).kode_jurusan = $event,
                        type: "text",
                        placeholder: "Contoh: RPL, TKJ, AK",
                        class: "form-input-custom",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).kode_jurusan]
                      ]),
                      unref(errors).kode_jurusan ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-[10px] text-rose-500 mt-1"
                      }, toDisplayString(unref(errors).kode_jurusan[0]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex flex-col gap-1.5" }, [
                      createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Nama Jurusan"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).nama_jurusan = $event,
                        type: "text",
                        placeholder: "Contoh: Rekayasa Perangkat Lunak",
                        class: "form-input-custom",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).nama_jurusan]
                      ]),
                      unref(errors).nama_jurusan ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-[10px] text-rose-500 mt-1"
                      }, toDisplayString(unref(errors).nama_jurusan[0]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex flex-col gap-1.5" }, [
                      createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Deskripsi"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).deskripsi = $event,
                        rows: "4",
                        placeholder: "Keterangan singkat tentang jurusan ini...",
                        class: "form-input-custom"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).deskripsi]
                      ]),
                      unref(errors).deskripsi ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-[10px] text-rose-500 mt-1"
                      }, toDisplayString(unref(errors).deskripsi[0]), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "pt-4 border-t dark:border-slate-700 flex justify-end gap-3" }, [
                      createVNode(_component_NuxtLink, {
                        to: "/admin/jurusan",
                        class: "px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(submitting),
                        class: "bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
                      }, toDisplayString(unref(submitting) ? "Memperbarui..." : "Update Jurusan"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/jurusan/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aa6821cf"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-D4425sOA.mjs.map
