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
    const schools = ref([]);
    const meta = ref({});
    const pending = ref(false);
    const fetchSchools = async () => {
      pending.value = true;
      try {
        const response = await get("/admin/sekolah", {
          page: page.value,
          search: search.value
        });
        schools.value = response.data;
        meta.value = response.meta;
        console.log("Fetched schools:", response);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      } finally {
        pending.value = false;
      }
    };
    let searchTimeout = null;
    watch(search, () => {
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        page.value = 1;
        fetchSchools();
      }, 500);
    });
    watch(page, () => {
      fetchSchools();
    });
    const confirmDelete = async (item) => {
      const result = await showAlert({
        title: "Hapus Sekolah?",
        text: `Anda yakin ingin menghapus sekolah ${item.nama_sekolah}? Semua data terkait (PIC, Guru, Siswa) mungkin akan terpengaruh.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        confirmButtonColor: "#e11d48"
      });
      if (result.isConfirmed) {
        try {
          await del(`/admin/sekolah/${item.id}`);
          await fetchSchools();
          showAlert({
            title: "Berhasil!",
            text: "Data sekolah telah dihapus.",
            icon: "success",
            timer: 1500
          });
        } catch (error) {
          showAlert({
            title: "Gagal!",
            text: error.data?.message || "Terjadi kesalahan saat menghapus sekolah.",
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
            _push2(`<div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700"${_scopeId}><h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize"${_scopeId}>Manajemen Sekolah</h1><nav class="flex items-center space-x-2 text-sm"${_scopeId}>`);
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
            _push2(`<span class="text-slate-500 dark:text-slate-400"${_scopeId}>Sekolah</span></nav></div><div class="p-6"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden"${_scopeId}><div class="p-4 border-b dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"${_scopeId}><div class="relative w-full md:w-64"${_scopeId}><span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:magnifying-glass-bold",
              class: "text-slate-400"
            }, null, _parent2, _scopeId));
            _push2(`</span><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Cari sekolah (Nama/NPSN)..." class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/sekolah/create",
              class: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "ph:plus-bold" }, null, _parent3, _scopeId2));
                  _push3(` Daftarkan Sekolah `);
                } else {
                  return [
                    createVNode(_component_Icon, { name: "ph:plus-bold" }),
                    createTextVNode(" Daftarkan Sekolah ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700"${_scopeId}><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>Sekolah</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>Wilayah</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>PIC Utama</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y dark:divide-slate-700"${_scopeId}>`);
            if (unref(pending)) {
              _push2(`<!--[-->`);
              ssrRenderList(5, (i) => {
                _push2(`<tr class="animate-pulse"${_scopeId}><td colspan="4" class="px-6 py-4"${_scopeId}><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"${_scopeId}></div></td></tr>`);
              });
              _push2(`<!--]-->`);
            } else if (unref(schools).length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-6 py-12 text-center text-slate-500"${_scopeId}>Tidak ada data sekolah ditemukan.</td></tr>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(unref(schools), (item) => {
                _push2(`<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"${_scopeId}><td class="px-6 py-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><img${ssrRenderAttr("src", item.logo_sekolah || "/logo-icon.png")} class="w-10 h-10 rounded border border-slate-100 dark:border-slate-700 object-cover"${_scopeId}><div${_scopeId}><p class="text-sm font-bold text-slate-800 dark:text-white"${_scopeId}>${ssrInterpolate(item.nama_sekolah)}</p><p class="text-[10px] text-slate-500 font-mono uppercase"${_scopeId}>${ssrInterpolate(item.jenjang)} - NPSN: ${ssrInterpolate(item.npsn)}</p></div></div></td><td class="px-6 py-4 text-xs text-slate-600 dark:text-slate-400"${_scopeId}><p class="font-medium"${_scopeId}>${ssrInterpolate(item.kota?.nama_kota)}</p><p${_scopeId}>${ssrInterpolate(item.provinsi?.nama_provinsi)}</p></td><td class="px-6 py-4"${_scopeId}>`);
                if (item.pic && item.pic.length > 0) {
                  _push2(`<div class="flex items-center gap-2"${_scopeId}><div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xs"${_scopeId}>${ssrInterpolate(item.pic[0].full_name.charAt(0))}</div><div${_scopeId}><p class="text-xs font-bold text-slate-700 dark:text-slate-300"${_scopeId}>${ssrInterpolate(item.pic[0].full_name)}</p><p class="text-[10px] text-slate-500"${_scopeId}>${ssrInterpolate(item.pic[0].username)}</p></div></div>`);
                } else {
                  _push2(`<span class="text-xs italic text-slate-400"${_scopeId}>Belum ada PIC</span>`);
                }
                _push2(`</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/admin/sekolah/edit/${item.id}`,
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
            _push2(`</tbody></table></div><div class="p-4 border-t dark:border-slate-700 flex items-center justify-between"${_scopeId}><p class="text-xs text-slate-500"${_scopeId}> Menampilkan ${ssrInterpolate(unref(meta).from || 0)} - ${ssrInterpolate(unref(meta).to || 0)} dari ${ssrInterpolate(unref(meta).total || 0)} sekolah </p><div class="flex gap-2"${_scopeId}><button${ssrIncludeBooleanAttr(unref(page) === 1) ? " disabled" : ""} class="px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"${_scopeId}> Prev </button><button${ssrIncludeBooleanAttr(unref(page) >= unref(meta).last_page) ? " disabled" : ""} class="px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"${_scopeId}> Next </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, [
                createVNode("h1", { class: "text-lg font-semibold text-slate-800 dark:text-white capitalize" }, "Manajemen Sekolah"),
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
                  createVNode("span", { class: "text-slate-500 dark:text-slate-400" }, "Sekolah")
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
                        placeholder: "Cari sekolah (Nama/NPSN)...",
                        class: "w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(search)]
                      ])
                    ]),
                    createVNode(_component_NuxtLink, {
                      to: "/admin/sekolah/create",
                      class: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "ph:plus-bold" }),
                        createTextVNode(" Daftarkan Sekolah ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700" }, [
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Sekolah"),
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Wilayah"),
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "PIC Utama"),
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
                        }), 64)) : unref(schools).length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "px-6 py-12 text-center text-slate-500"
                          }, "Tidak ada data sekolah ditemukan.")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(schools), (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("img", {
                                  src: item.logo_sekolah || "/logo-icon.png",
                                  class: "w-10 h-10 rounded border border-slate-100 dark:border-slate-700 object-cover"
                                }, null, 8, ["src"]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-bold text-slate-800 dark:text-white" }, toDisplayString(item.nama_sekolah), 1),
                                  createVNode("p", { class: "text-[10px] text-slate-500 font-mono uppercase" }, toDisplayString(item.jenjang) + " - NPSN: " + toDisplayString(item.npsn), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-xs text-slate-600 dark:text-slate-400" }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(item.kota?.nama_kota), 1),
                              createVNode("p", null, toDisplayString(item.provinsi?.nama_provinsi), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              item.pic && item.pic.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-2"
                              }, [
                                createVNode("div", { class: "w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xs" }, toDisplayString(item.pic[0].full_name.charAt(0)), 1),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-xs font-bold text-slate-700 dark:text-slate-300" }, toDisplayString(item.pic[0].full_name), 1),
                                  createVNode("p", { class: "text-[10px] text-slate-500" }, toDisplayString(item.pic[0].username), 1)
                                ])
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-xs italic text-slate-400"
                              }, "Belum ada PIC"))
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode(_component_NuxtLink, {
                                  to: `/admin/sekolah/edit/${item.id}`,
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
                    createVNode("p", { class: "text-xs text-slate-500" }, " Menampilkan " + toDisplayString(unref(meta).from || 0) + " - " + toDisplayString(unref(meta).to || 0) + " dari " + toDisplayString(unref(meta).total || 0) + " sekolah ", 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/sekolah/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DQsVIPbq.mjs.map
