import { c as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import __nuxt_component_0$2 from './index-ZpQ2fISz.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, unref, createVNode, withDirectives, isRef, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
    const { get, fetchapi } = useApi();
    const { showAlert } = useAlert();
    const search = ref("");
    const loading = ref(true);
    const loadingAvailable = ref(false);
    const submitting = ref(false);
    const showAddModal = ref(false);
    const listJurusan = ref([]);
    const availableJurusan = ref([]);
    const selectedJurusanId = ref("");
    const fetchListJurusan = async () => {
      loading.value = true;
      try {
        const res = await get("/sekolah/jurusan");
        listJurusan.value = res.data || [];
      } catch (error) {
        console.error("Failed to fetch jurusan:", error);
        showAlert({
          title: "Gagal!",
          text: "Terjadi kesalahan saat mengambil data jurusan.",
          icon: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const fetchAvailableJurusan = async () => {
      loadingAvailable.value = true;
      try {
        const res = await get("/sekolah/jurusan/available");
        availableJurusan.value = res.data || [];
      } catch (error) {
        console.error("Failed to fetch available jurusan:", error);
      } finally {
        loadingAvailable.value = false;
      }
    };
    const filteredJurusan = computed(() => {
      if (!search.value) return listJurusan.value;
      return listJurusan.value.filter(
        (item) => item.nama_jurusan.toLowerCase().includes(search.value.toLowerCase()) || item.kode_jurusan?.toLowerCase().includes(search.value.toLowerCase())
      );
    });
    const openAddModal = () => {
      selectedJurusanId.value = "";
      showAddModal.value = true;
      fetchAvailableJurusan();
    };
    const closeAddModal = () => {
      showAddModal.value = false;
    };
    const saveJurusan = async () => {
      if (!selectedJurusanId.value) return;
      submitting.value = true;
      try {
        await fetchapi("/sekolah/jurusan", {
          method: "POST",
          body: { jurusan_id: selectedJurusanId.value }
        });
        showAlert({
          title: "Berhasil!",
          text: "Jurusan telah ditambahkan ke sekolah.",
          icon: "success",
          timer: 1500
        });
        closeAddModal();
        fetchListJurusan();
      } catch (error) {
        showAlert({
          title: "Gagal!",
          text: error.data?.message || "Terjadi kesalahan saat menambahkan jurusan.",
          icon: "error"
        });
      } finally {
        submitting.value = false;
      }
    };
    const confirmDelete = (item) => {
      if (confirm(`Apakah Anda yakin ingin menghapus jurusan "${item.nama_jurusan}" dari sekolah?`)) {
        deleteJurusan(item.id);
      }
    };
    const deleteJurusan = async (id) => {
      try {
        await fetchapi(`/sekolah/jurusan/${id}`, {
          method: "DELETE"
        });
        showAlert({
          title: "Berhasil!",
          text: "Jurusan telah dihapus dari sekolah.",
          icon: "success",
          timer: 1500
        });
        fetchListJurusan();
      } catch (error) {
        showAlert({
          title: "Gagal!",
          text: error.data?.message || "Terjadi kesalahan saat menghapus jurusan.",
          icon: "error"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700"${_scopeId}><div${_scopeId}><h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize"${_scopeId}>Manajemen Jurusan</h1><p class="text-xs text-slate-500 mt-0.5"${_scopeId}>Kelola program keahlian yang aktif di sekolah Anda</p></div><nav class="flex items-center space-x-2 text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/sekolah",
              class: "text-blue-500 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Sekolah`);
                } else {
                  return [
                    createTextVNode("Sekolah")
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
            _push2(`<span class="text-slate-500 dark:text-slate-400"${_scopeId}>Jurusan</span></nav></div><div class="p-6"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm overflow-hidden"${_scopeId}><div class="p-6 border-b dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-2"${_scopeId}><div class="relative max-w-xs w-full"${_scopeId}><span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:magnifying-glass-bold",
              size: "18"
            }, null, _parent2, _scopeId));
            _push2(`</span><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Cari jurusan..." class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"${_scopeId}></div><button class="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "ph:plus-bold" }, null, _parent2, _scopeId));
            _push2(` Tambah Jurusan </button></div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700"${_scopeId}><th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-16 text-center"${_scopeId}>No</th><th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest"${_scopeId}>Kode</th><th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest"${_scopeId}>Nama Jurusan</th><th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right"${_scopeId}>Aksi</th></tr></thead><tbody class="divide-y dark:divide-slate-700"${_scopeId}>`);
            if (unref(loading)) {
              _push2(`<!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(`<tr class="animate-pulse"${_scopeId}><td class="px-6 py-4"${_scopeId}><div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-8 mx-auto"${_scopeId}></div></td><td class="px-6 py-4"${_scopeId}><div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-16"${_scopeId}></div></td><td class="px-6 py-4"${_scopeId}><div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-48"${_scopeId}></div></td><td class="px-6 py-4"${_scopeId}><div class="h-8 bg-slate-100 dark:bg-slate-700 rounded w-20 ml-auto"${_scopeId}></div></td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(unref(filteredJurusan), (item, index) => {
                _push2(`<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group"${_scopeId}><td class="px-6 py-4 text-sm text-slate-500 text-center font-medium"${_scopeId}>${ssrInterpolate(index + 1)}</td><td class="px-6 py-4"${_scopeId}><span class="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider"${_scopeId}>${ssrInterpolate(item.kode_jurusan || "N/A")}</span></td><td class="px-6 py-4"${_scopeId}><div class="text-sm font-bold text-slate-700 dark:text-slate-200"${_scopeId}>${ssrInterpolate(item.nama_jurusan)}</div></td><td class="px-6 py-4 text-right"${_scopeId}><button class="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100" title="Hapus Jurusan"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "ph:trash-duotone",
                  size: "18"
                }, null, _parent2, _scopeId));
                _push2(`</button></td></tr>`);
              });
              _push2(`<!--]-->`);
            }
            if (!unref(loading) && unref(filteredJurusan).length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-6 py-12 text-center"${_scopeId}><div class="flex flex-col items-center justify-center text-slate-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:files-thin",
                size: "64",
                class: "mb-4 opacity-20"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm font-medium"${_scopeId}>Belum ada jurusan yang ditambahkan</p><p class="text-[10px] mt-1"${_scopeId}>Klik tombol &quot;Tambah Jurusan&quot; untuk memulai</p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div>`);
            if (unref(showAddModal)) {
              _push2(`<div class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"${_scopeId}><div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"${_scopeId}></div><div class="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200"${_scopeId}><div class="px-6 py-4 border-b dark:border-slate-700 flex items-center justify-between"${_scopeId}><h3 class="font-bold text-slate-800 dark:text-white"${_scopeId}>Tambah Jurusan ke Sekolah</h3><button class="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, { name: "ph:x-bold" }, null, _parent2, _scopeId));
              _push2(`</button></div><div class="p-6 space-y-6"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase tracking-wider"${_scopeId}>Pilih Jurusan</label><div class="relative"${_scopeId}><select class="w-full p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700 dark:text-slate-200 appearance-none"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedJurusanId)) ? ssrLooseContain(unref(selectedJurusanId), "") : ssrLooseEqual(unref(selectedJurusanId), "")) ? " selected" : ""}${_scopeId}>Pilih Jurusan yang Tersedia</option><!--[-->`);
              ssrRenderList(unref(availableJurusan), (jur) => {
                _push2(`<option${ssrRenderAttr("value", jur.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedJurusanId)) ? ssrLooseContain(unref(selectedJurusanId), jur.id) : ssrLooseEqual(unref(selectedJurusanId), jur.id)) ? " selected" : ""}${_scopeId}> [${ssrInterpolate(jur.kode_jurusan)}] ${ssrInterpolate(jur.nama_jurusan)}</option>`);
              });
              _push2(`<!--]--></select><span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, { name: "ph:caret-down-bold" }, null, _parent2, _scopeId));
              _push2(`</span></div>`);
              if (unref(availableJurusan).length === 0 && !unref(loadingAvailable)) {
                _push2(`<p class="text-[10px] text-amber-500 font-medium"${_scopeId}> Semua jurusan yang tersedia sudah didaftarkan ke sekolah Anda. </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 flex gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:info-bold",
                class: "text-blue-600 flex-shrink-0",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed"${_scopeId}> Menambahkan jurusan akan memungkinkan Anda untuk mengelola kelas dan siswa dalam jurusan tersebut. </p></div></div><div class="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-end gap-3"${_scopeId}><button class="px-6 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all"${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!unref(selectedJurusanId) || unref(submitting)) ? " disabled" : ""} class="bg-blue-600 text-white px-8 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2"${_scopeId}>`);
              if (unref(submitting)) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "ph:circle-notch-bold",
                  class: "animate-spin"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(` Simpan Jurusan </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-lg font-semibold text-slate-800 dark:text-white capitalize" }, "Manajemen Jurusan"),
                  createVNode("p", { class: "text-xs text-slate-500 mt-0.5" }, "Kelola program keahlian yang aktif di sekolah Anda")
                ]),
                createVNode("nav", { class: "flex items-center space-x-2 text-sm" }, [
                  createVNode(_component_NuxtLink, {
                    to: "/sekolah",
                    class: "text-blue-500 hover:underline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Sekolah")
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
                createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm overflow-hidden" }, [
                  createVNode("div", { class: "p-6 border-b dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-2" }, [
                    createVNode("div", { class: "relative max-w-xs w-full" }, [
                      createVNode("span", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400" }, [
                        createVNode(_component_Icon, {
                          name: "ph:magnifying-glass-bold",
                          size: "18"
                        })
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        type: "text",
                        placeholder: "Cari jurusan...",
                        class: "w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(search)]
                      ])
                    ]),
                    createVNode("button", {
                      onClick: openAddModal,
                      class: "bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                    }, [
                      createVNode(_component_Icon, { name: "ph:plus-bold" }),
                      createTextVNode(" Tambah Jurusan ")
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-left border-collapse" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-700" }, [
                          createVNode("th", { class: "px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-16 text-center" }, "No"),
                          createVNode("th", { class: "px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest" }, "Kode"),
                          createVNode("th", { class: "px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest" }, "Nama Jurusan"),
                          createVNode("th", { class: "px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y dark:divide-slate-700" }, [
                        unref(loading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(3, (i) => {
                          return createVNode("tr", {
                            key: i,
                            class: "animate-pulse"
                          }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-slate-100 dark:bg-slate-700 rounded w-8 mx-auto" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-slate-100 dark:bg-slate-700 rounded w-16" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-slate-100 dark:bg-slate-700 rounded w-48" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-8 bg-slate-100 dark:bg-slate-700 rounded w-20 ml-auto" })
                            ])
                          ]);
                        }), 64)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(filteredJurusan), (item, index) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group"
                          }, [
                            createVNode("td", { class: "px-6 py-4 text-sm text-slate-500 text-center font-medium" }, toDisplayString(index + 1), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", { class: "px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider" }, toDisplayString(item.kode_jurusan || "N/A"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-sm font-bold text-slate-700 dark:text-slate-200" }, toDisplayString(item.nama_jurusan), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("button", {
                                onClick: ($event) => confirmDelete(item),
                                class: "p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100",
                                title: "Hapus Jurusan"
                              }, [
                                createVNode(_component_Icon, {
                                  name: "ph:trash-duotone",
                                  size: "18"
                                })
                              ], 8, ["onClick"])
                            ])
                          ]);
                        }), 128)),
                        !unref(loading) && unref(filteredJurusan).length === 0 ? (openBlock(), createBlock("tr", { key: 2 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "px-6 py-12 text-center"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center justify-center text-slate-400" }, [
                              createVNode(_component_Icon, {
                                name: "ph:files-thin",
                                size: "64",
                                class: "mb-4 opacity-20"
                              }),
                              createVNode("p", { class: "text-sm font-medium" }, "Belum ada jurusan yang ditambahkan"),
                              createVNode("p", { class: "text-[10px] mt-1" }, 'Klik tombol "Tambah Jurusan" untuk memulai')
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ]),
              unref(showAddModal) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
              }, [
                createVNode("div", {
                  class: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm",
                  onClick: closeAddModal
                }),
                createVNode("div", { class: "relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200" }, [
                  createVNode("div", { class: "px-6 py-4 border-b dark:border-slate-700 flex items-center justify-between" }, [
                    createVNode("h3", { class: "font-bold text-slate-800 dark:text-white" }, "Tambah Jurusan ke Sekolah"),
                    createVNode("button", {
                      onClick: closeAddModal,
                      class: "p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all"
                    }, [
                      createVNode(_component_Icon, { name: "ph:x-bold" })
                    ])
                  ]),
                  createVNode("div", { class: "p-6 space-y-6" }, [
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Pilih Jurusan"),
                      createVNode("div", { class: "relative" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => isRef(selectedJurusanId) ? selectedJurusanId.value = $event : null,
                          class: "w-full p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700 dark:text-slate-200 appearance-none"
                        }, [
                          createVNode("option", { value: "" }, "Pilih Jurusan yang Tersedia"),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(availableJurusan), (jur) => {
                            return openBlock(), createBlock("option", {
                              key: jur.id,
                              value: jur.id
                            }, " [" + toDisplayString(jur.kode_jurusan) + "] " + toDisplayString(jur.nama_jurusan), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(selectedJurusanId)]
                        ]),
                        createVNode("span", { class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400" }, [
                          createVNode(_component_Icon, { name: "ph:caret-down-bold" })
                        ])
                      ]),
                      unref(availableJurusan).length === 0 && !unref(loadingAvailable) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-[10px] text-amber-500 font-medium"
                      }, " Semua jurusan yang tersedia sudah didaftarkan ke sekolah Anda. ")) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 flex gap-3" }, [
                      createVNode(_component_Icon, {
                        name: "ph:info-bold",
                        class: "text-blue-600 flex-shrink-0",
                        size: "20"
                      }),
                      createVNode("p", { class: "text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed" }, " Menambahkan jurusan akan memungkinkan Anda untuk mengelola kelas dan siswa dalam jurusan tersebut. ")
                    ])
                  ]),
                  createVNode("div", { class: "p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-end gap-3" }, [
                    createVNode("button", {
                      onClick: closeAddModal,
                      class: "px-6 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all"
                    }, " Batal "),
                    createVNode("button", {
                      onClick: saveJurusan,
                      disabled: !unref(selectedJurusanId) || unref(submitting),
                      class: "bg-blue-600 text-white px-8 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                    }, [
                      unref(submitting) ? (openBlock(), createBlock(_component_Icon, {
                        key: 0,
                        name: "ph:circle-notch-bold",
                        class: "animate-spin"
                      })) : createCommentVNode("", true),
                      createTextVNode(" Simpan Jurusan ")
                    ], 8, ["disabled"])
                  ])
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sekolah/jurusan/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CltdKbh0.mjs.map
