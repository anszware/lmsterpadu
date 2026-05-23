import { c as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import __nuxt_component_0$2 from './index-ZpQ2fISz.mjs';
import { ref, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, withDirectives, isRef, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
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
    const users = ref([]);
    const meta = ref({});
    const pending = ref(false);
    const fetchUsers = async () => {
      pending.value = true;
      try {
        const response = await get("/admin/user", {
          page: page.value,
          search: search.value
        });
        users.value = response.data;
        meta.value = response.meta;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        pending.value = false;
      }
    };
    let searchTimeout = null;
    watch(search, () => {
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        page.value = 1;
        fetchUsers();
      }, 500);
    });
    watch(page, () => {
      fetchUsers();
    });
    const confirmDelete = async (user) => {
      const result = await showAlert({
        title: "Hapus User?",
        text: `Anda yakin ingin menghapus user ${user.username}? Data person terkait juga akan dihapus.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        confirmButtonColor: "#e11d48"
      });
      if (result.isConfirmed) {
        try {
          await del(`/admin/user/${user.id}`);
          await fetchUsers();
          showAlert({
            title: "Berhasil!",
            text: "User telah dihapus.",
            icon: "success",
            timer: 1500
          });
        } catch (error) {
          showAlert({
            title: "Gagal!",
            text: error.data?.message || "Terjadi kesalahan saat menghapus user.",
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
            _push2(`<div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700"${_scopeId}><h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize"${_scopeId}>Manajemen User</h1><nav class="flex items-center space-x-2 text-sm"${_scopeId}>`);
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
            _push2(`<span class="text-slate-500 dark:text-slate-400"${_scopeId}>User</span></nav></div><div class="p-6"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden"${_scopeId}><div class="p-4 border-b dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"${_scopeId}><div class="relative w-full md:w-64"${_scopeId}><span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:magnifying-glass-bold",
              class: "text-slate-400"
            }, null, _parent2, _scopeId));
            _push2(`</span><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Cari user..." class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/users/create",
              class: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "ph:plus-bold" }, null, _parent3, _scopeId2));
                  _push3(` Tambah User `);
                } else {
                  return [
                    createVNode(_component_Icon, { name: "ph:plus-bold" }),
                    createTextVNode(" Tambah User ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700"${_scopeId}><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>User</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>Role</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>Info Person</th><th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y dark:divide-slate-700"${_scopeId}>`);
            if (unref(pending)) {
              _push2(`<!--[-->`);
              ssrRenderList(5, (i) => {
                _push2(`<tr class="animate-pulse"${_scopeId}><td colspan="4" class="px-6 py-4"${_scopeId}><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"${_scopeId}></div></td></tr>`);
              });
              _push2(`<!--]-->`);
            } else if (unref(users).length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-6 py-12 text-center text-slate-500"${_scopeId}>Tidak ada data user ditemukan.</td></tr>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(unref(users), (user) => {
                _push2(`<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"${_scopeId}><td class="px-6 py-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><img${ssrRenderAttr("src", user.person?.foto || `https://ui-avatars.com/api/?name=${user.person?.full_name || user.username}&background=random&color=fff`)} class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"${_scopeId}><div${_scopeId}><p class="text-sm font-bold text-slate-800 dark:text-white"${_scopeId}>${ssrInterpolate(user.username)}</p><p class="text-xs text-slate-500"${_scopeId}>${ssrInterpolate(user.email)}</p></div></div></td><td class="px-6 py-4"${_scopeId}><span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800"${_scopeId}>${ssrInterpolate(user.role?.name)}</span></td><td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>`);
                if (user.person) {
                  _push2(`<p class="font-medium text-slate-700 dark:text-slate-300"${_scopeId}>${ssrInterpolate(user.person.full_name)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (user.person) {
                  _push2(`<p class="text-xs"${_scopeId}>NIK: ${ssrInterpolate(user.person.nik)}</p>`);
                } else {
                  _push2(`<span class="text-xs italic text-slate-400"${_scopeId}>Data person belum diisi</span>`);
                }
                _push2(`</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/admin/users/edit/${user.id}`,
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
            _push2(`</tbody></table></div><div class="p-4 border-t dark:border-slate-700 flex items-center justify-between"${_scopeId}><p class="text-xs text-slate-500"${_scopeId}> Menampilkan ${ssrInterpolate(unref(meta).from || 0)} - ${ssrInterpolate(unref(meta).to || 0)} dari ${ssrInterpolate(unref(meta).total || 0)} user </p><div class="flex gap-2"${_scopeId}><button${ssrIncludeBooleanAttr(unref(page) === 1) ? " disabled" : ""} class="px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"${_scopeId}> Prev </button><button${ssrIncludeBooleanAttr(unref(page) >= unref(meta).last_page) ? " disabled" : ""} class="px-3 py-1 text-xs font-semibold rounded-lg border dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"${_scopeId}> Next </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, [
                createVNode("h1", { class: "text-lg font-semibold text-slate-800 dark:text-white capitalize" }, "Manajemen User"),
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
                  createVNode("span", { class: "text-slate-500 dark:text-slate-400" }, "User")
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
                        placeholder: "Cari user...",
                        class: "w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(search)]
                      ])
                    ]),
                    createVNode(_component_NuxtLink, {
                      to: "/admin/users/create",
                      class: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, { name: "ph:plus-bold" }),
                        createTextVNode(" Tambah User ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700" }, [
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "User"),
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Role"),
                          createVNode("th", { class: "px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Info Person"),
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
                        }), 64)) : unref(users).length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "px-6 py-12 text-center text-slate-500"
                          }, "Tidak ada data user ditemukan.")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(users), (user) => {
                          return openBlock(), createBlock("tr", {
                            key: user.id,
                            class: "hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("img", {
                                  src: user.person?.foto || `https://ui-avatars.com/api/?name=${user.person?.full_name || user.username}&background=random&color=fff`,
                                  class: "w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                                }, null, 8, ["src"]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-bold text-slate-800 dark:text-white" }, toDisplayString(user.username), 1),
                                  createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(user.email), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", { class: "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800" }, toDisplayString(user.role?.name), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-slate-600 dark:text-slate-400" }, [
                              user.person ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "font-medium text-slate-700 dark:text-slate-300"
                              }, toDisplayString(user.person.full_name), 1)) : createCommentVNode("", true),
                              user.person ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-xs"
                              }, "NIK: " + toDisplayString(user.person.nik), 1)) : (openBlock(), createBlock("span", {
                                key: 2,
                                class: "text-xs italic text-slate-400"
                              }, "Data person belum diisi"))
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                createVNode(_component_NuxtLink, {
                                  to: `/admin/users/edit/${user.id}`,
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
                                  onClick: ($event) => confirmDelete(user),
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
                    createVNode("p", { class: "text-xs text-slate-500" }, " Menampilkan " + toDisplayString(unref(meta).from || 0) + " - " + toDisplayString(unref(meta).to || 0) + " dari " + toDisplayString(unref(meta).total || 0) + " user ", 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CjqzukrR.mjs.map
