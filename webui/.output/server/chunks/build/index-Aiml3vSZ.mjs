import { c as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import __nuxt_component_0$2 from './index-ZpQ2fISz.mjs';
import { ref, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, withDirectives, isRef, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { get, del } = useApi();
    const { showAlert } = useAlert();
    const page = ref(1);
    const search = ref("");
    const jurusans = ref([]);
    const meta = ref({});
    const pending = ref(false);
    const fetchJurusans = async () => {
      pending.value = true;
      try {
        const response = await get("/admin/jurusan", {
          page: page.value,
          search: search.value
        });
        jurusans.value = response.data;
        meta.value = response.meta;
      } catch (error) {
        console.error("Failed to fetch jurusans:", error);
      } finally {
        pending.value = false;
      }
    };
    let searchTimeout = null;
    watch(search, () => {
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        page.value = 1;
        fetchJurusans();
      }, 500);
    });
    watch(page, () => {
      fetchJurusans();
    });
    const confirmDelete = async (item) => {
      const result = await showAlert({
        title: "Hapus Jurusan?",
        text: `Anda yakin ingin menghapus jurusan ${item.nama_jurusan}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        confirmButtonColor: "#e11d48"
      });
      if (result.isConfirmed) {
        try {
          await del(`/admin/jurusan/${item.id}`);
          await fetchJurusans();
          showAlert({
            title: "Berhasil!",
            text: "Jurusan telah dihapus.",
            icon: "success",
            timer: 1500
          });
        } catch (error) {
          showAlert({
            title: "Gagal!",
            text: error.data?.message || "Terjadi kesalahan saat menghapus jurusan.",
            icon: "error"
          });
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700"${_scopeId}><h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize"${_scopeId}>Manajemen Jurusan</h1><nav class="flex items-center space-x-2 text-sm"${_scopeId}>`);
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
            _push2(`<span class="text-slate-500 dark:text-slate-400"${_scopeId}>Jurusan</span></nav></div><div class="p-6"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden"${_scopeId}><div class="p-4 border-b dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"${_scopeId}><div class="relative w-full md:w-64"${_scopeId}><span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:magnifying-glass-bold",
              class: "text-slate-400"
            }, null, _parent2, _scopeId));
            _push2(`</span><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Cari jurusan..." class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/jurusan/create",
              class: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "ph:plus-bold" }, null, _parent3, _scopeId2));
                  _push3(` Tambah Jurusan `);
                } else {
                  return [
                    createVNode(_component_Icon, { name: "ph:plus-bold" }),
                    createTextVNode(" Tambah Jurusan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700"${_scopeId}><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>Kode</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>Nama Jurusan</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>Deskripsi</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y dark:divide-slate-700"${_scopeId}>`);
            if (unref(pending)) {
              _push2(`<!--[-->`);
              ssrRenderList(5, (i) => {
                _push2(`<tr class="animate-pulse"${_scopeId}><td colspan="4" class="px-6 py-4"${_scopeId}><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"${_scopeId}></div></td></tr>`);
              });
              _push2(`<!--]-->`);
            } else if (unref(jurusans).length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-6 py-12 text-center text-slate-500"${_scopeId}>Tidak ada data jurusan ditemukan.</td></tr>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(unref(jurusans), (item) => {
                _push2(`<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"${_scopeId}><td class="px-6 py-4"${_scopeId}><span class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400"${_scopeId}>${ssrInterpolate(item.kode_jurusan)}</span></td><td class="px-6 py-4"${_scopeId}><p class="text-sm font-bold text-slate-800 dark:text-white"${_scopeId}>${ssrInterpolate(item.nama_jurusan)}</p></td><td class="px-6 py-4"${_scopeId}><p class="text-xs text-slate-500 line-clamp-1"${_scopeId}>${ssrInterpolate(item.deskripsi || "-")}</p></td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/admin/jurusan/edit/${item.id}`,
                  class: "p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors",
                  title: "Edit"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "ph:pencil-simple-bold",
                        size: "18"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_Icon, {
                          name: "ph:pencil-simple-bold",
                          size: "18"
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors" title="Hapus"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "ph:trash-bold",
                  size: "18"
                }, null, _parent2, _scopeId));
                _push2(`</button></div></td></tr>`);
              });
              _push2(`<!--]-->`);
            }
            _push2(`</tbody></table></div><div class="p-4 border-t dark:border-slate-700 flex items-center justify-between"${_scopeId}><p class="text-xs text-slate-500"${_scopeId}> Menampilkan ${ssrInterpolate(unref(meta).from || 0)} - ${ssrInterpolate(unref(meta).to || 0)} dari ${ssrInterpolate(unref(meta).total || 0)} jurusan </p><div class="flex gap-2"${_scopeId}><button${ssrIncludeBooleanAttr(unref(page) === 1) ? " disabled" : ""} class="px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"${_scopeId}> Prev </button><button${ssrIncludeBooleanAttr(unref(page) >= unref(meta).last_page) ? " disabled" : ""} class="px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"${_scopeId}> Next </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, [
                createVNode("h1", { class: "text-lg font-semibold text-slate-800 dark:text-white capitalize" }, "Manajemen Jurusan"),
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
                  createVNode("span", { class: "text-slate-500 dark:text-slate-400" }, "Jurusan")
                ])
              ]),
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden" }, [
                  createVNode("div", { class: "p-4 border-b dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4" }, [
                    createVNode("div", { class: "relative w-full md:w-64" }, [
                      createVNode("span", { class: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" }, [
                        createVNode(_component_Icon, {
                          name: "ph:magnifying-glass-bold",
                          class: "text-slate-400"
                        })
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        type: "text",
                        placeholder: "Cari jurusan...",
                        class: "w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(search)]
                      ])
                    ]),
                    createVNode(_component_NuxtLink, {
                      to: "/admin/jurusan/create",
                      class: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "ph:plus-bold" }),
                        createTextVNode(" Tambah Jurusan ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700" }, [
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Kode"),
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Nama Jurusan"),
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Deskripsi"),
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y dark:divide-slate-700" }, [
                        unref(pending) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(5, (i) => {
                          return createVNode("tr", {
                            key: i,
                            class: "animate-pulse"
                          }, [
                            createVNode("td", {
                              colspan: "4",
                              class: "px-6 py-4"
                            }, [
                              createVNode("div", { class: "h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" })
                            ])
                          ]);
                        }), 64)) : unref(jurusans).length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "px-6 py-12 text-center text-slate-500"
                          }, "Tidak ada data jurusan ditemukan.")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(jurusans), (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", { class: "font-mono text-sm font-bold text-blue-600 dark:text-blue-400" }, toDisplayString(item.kode_jurusan), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("p", { class: "text-sm font-bold text-slate-800 dark:text-white" }, toDisplayString(item.nama_jurusan), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("p", { class: "text-xs text-slate-500 line-clamp-1" }, toDisplayString(item.deskripsi || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode(_component_NuxtLink, {
                                  to: `/admin/jurusan/edit/${item.id}`,
                                  class: "p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors",
                                  title: "Edit"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "ph:pencil-simple-bold",
                                      size: "18"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["to"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDelete(item),
                                  class: "p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors",
                                  title: "Hapus"
                                }, [
                                  createVNode(_component_Icon, {
                                    name: "ph:trash-bold",
                                    size: "18"
                                  })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "p-4 border-t dark:border-slate-700 flex items-center justify-between" }, [
                    createVNode("p", { class: "text-xs text-slate-500" }, " Menampilkan " + toDisplayString(unref(meta).from || 0) + " - " + toDisplayString(unref(meta).to || 0) + " dari " + toDisplayString(unref(meta).total || 0) + " jurusan ", 1),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("button", {
                        disabled: unref(page) === 1,
                        onClick: ($event) => page.value--,
                        class: "px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      }, " Prev ", 8, ["disabled", "onClick"]),
                      createVNode("button", {
                        disabled: unref(page) >= unref(meta).last_page,
                        onClick: ($event) => page.value++,
                        class: "px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      }, " Next ", 8, ["disabled", "onClick"])
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/jurusan/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Aiml3vSZ.mjs.map
