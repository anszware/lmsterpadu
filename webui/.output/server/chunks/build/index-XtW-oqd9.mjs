import { c as __nuxt_component_0 } from './server.mjs';
import __nuxt_component_0$1 from './index-ZpQ2fISz.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-BGJgSZtr.mjs';
import { ref, mergeProps, withCtx, unref, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useApi } from './useApi-BTut_o5P.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    ref(null);
    const sekolah = ref(null);
    ref(true);
    const stats = [
      {
        title: "Total Siswa",
        value: "856",
        icon: "ph:users-duotone",
        bgColor: "bg-primary",
        trend: "+5.2%",
        trendIcon: "ph:trend-up-bold",
        trendColor: "text-success"
      },
      {
        title: "Total Guru",
        value: "42",
        icon: "ph:chalkboard-teacher-duotone",
        bgColor: "bg-info",
        trend: "+2.1%",
        trendIcon: "ph:trend-up-bold",
        trendColor: "text-success"
      },
      {
        title: "Jurusan Aktif",
        value: "6",
        icon: "ph:graduation-cap-duotone",
        bgColor: "bg-warning",
        trend: "0%",
        trendIcon: "ph:minus-bold",
        trendColor: "text-slate-400"
      },
      {
        title: "Lulusan (TA)",
        value: "210",
        icon: "ph:student-duotone",
        bgColor: "bg-success",
        trend: "+12.4%",
        trendIcon: "ph:trend-up-bold",
        trendColor: "text-success"
      }
    ];
    const shortcuts = [
      { name: "Jurusan", to: "/sekolah/jurusan", icon: "ph:graduation-cap-duotone", color: "blue" },
      { name: "Guru", to: "/sekolah/guru", icon: "ph:chalkboard-teacher-duotone", color: "indigo" },
      { name: "Siswa", to: "/sekolah/siswa", icon: "ph:student-duotone", color: "emerald" },
      { name: "Kelas", to: "/sekolah/kelas", icon: "ph:door-duotone", color: "purple" },
      { name: "Mapel", to: "/sekolah/mapel", icon: "ph:books-duotone", color: "rose" },
      { name: "Profil", to: "/sekolah/profile", icon: "ph:buildings-duotone", color: "orange" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 md:p-0"${_scopeId}><div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"${_scopeId}><div${_scopeId}><h3 class="text-xl font-bold text-slate-800 dark:text-white"${_scopeId}>PIC Dashboard</h3><p class="text-[13px] text-slate-500 dark:text-slate-400"${_scopeId}>Welcome back, <strong${_scopeId}>${ssrInterpolate(unref(sekolah)?.nama || "...")}</strong> monitor is active.</p></div><div class="flex items-center gap-2"${_scopeId}><button class="px-4 py-2 bg-white dark:bg-custom-sidebar border border-slate-200 dark:border-white/10 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:calendar-bold",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Filter by Date</span></button><button class="px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:download-bold",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Export Report</span></button></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><!--[-->`);
            ssrRenderList(stats, (stat) => {
              _push2(`<div class="bg-white dark:bg-custom-sidebar p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow group"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div class="${ssrRenderClass([stat.bgColor, "w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: stat.icon,
                size: "24"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex flex-col items-end"${_scopeId}><span class="${ssrRenderClass([stat.trendColor, "text-[11px] font-bold flex items-center gap-1"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: stat.trendIcon,
                size: "12"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(stat.trend)}</span><span class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter"${_scopeId}>vs last month</span></div></div><div${_scopeId}><p class="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1"${_scopeId}>${ssrInterpolate(stat.title)}</p><h4 class="text-2xl font-bold text-slate-800 dark:text-white"${_scopeId}>${ssrInterpolate(stat.value)}</h4></div></div>`);
            });
            _push2(`<!--]--></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2 bg-white dark:bg-custom-sidebar p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h5 class="text-[15px] font-bold text-slate-800 dark:text-white"${_scopeId}>School Activity Overview</h5><div class="flex items-center gap-2"${_scopeId}><button class="p-1.5 text-slate-400 hover:text-primary transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:dots-three-outline-vertical-fill",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(`</button></div></div><div class="h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-xl bg-slate-50/50 dark:bg-white/5 group"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:chart-line-up-bold",
              size: "48",
              class: "text-slate-300 dark:text-white/10 mb-4 transition-transform group-hover:scale-110"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-[13px] text-slate-400 font-medium"${_scopeId}>Activity Chart Visualization</p></div></div><div class="bg-white dark:bg-custom-sidebar p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h5 class="text-[15px] font-bold text-slate-800 dark:text-white"${_scopeId}>Akses Cepat</h5></div><div class="grid grid-cols-2 gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(shortcuts, (menu) => {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                key: menu.name,
                to: menu.to,
                class: "flex flex-col items-center p-3 rounded-lg border border-slate-100 dark:border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all text-center group"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass(`w-10 h-10 rounded-lg flex items-center justify-center bg-${menu.color}-50 dark:bg-${menu.color}-900/20 text-${menu.color}-600 mb-2 group-hover:scale-110 transition-transform`)}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: menu.icon,
                      size: "20"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><span class="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight"${_scopeId2}>${ssrInterpolate(menu.name)}</span>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: `w-10 h-10 rounded-lg flex items-center justify-center bg-${menu.color}-50 dark:bg-${menu.color}-900/20 text-${menu.color}-600 mb-2 group-hover:scale-110 transition-transform`
                      }, [
                        createVNode(_component_Icon, {
                          name: menu.icon,
                          size: "20"
                        }, null, 8, ["name"])
                      ], 2),
                      createVNode("span", { class: "text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight" }, toDisplayString(menu.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 md:p-0" }, [
                createVNode("div", { class: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-xl font-bold text-slate-800 dark:text-white" }, "PIC Dashboard"),
                    createVNode("p", { class: "text-[13px] text-slate-500 dark:text-slate-400" }, [
                      createTextVNode("Welcome back, "),
                      createVNode("strong", null, toDisplayString(unref(sekolah)?.nama || "..."), 1),
                      createTextVNode(" monitor is active.")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("button", { class: "px-4 py-2 bg-white dark:bg-custom-sidebar border border-slate-200 dark:border-white/10 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        name: "ph:calendar-bold",
                        size: "16"
                      }),
                      createVNode("span", null, "Filter by Date")
                    ]),
                    createVNode("button", { class: "px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2" }, [
                      createVNode(_component_Icon, {
                        name: "ph:download-bold",
                        size: "16"
                      }),
                      createVNode("span", null, "Export Report")
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
                    return createVNode("div", {
                      key: stat.title,
                      class: "bg-white dark:bg-custom-sidebar p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow group"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("div", {
                          class: [stat.bgColor, "w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"]
                        }, [
                          createVNode(_component_Icon, {
                            name: stat.icon,
                            size: "24"
                          }, null, 8, ["name"])
                        ], 2),
                        createVNode("div", { class: "flex flex-col items-end" }, [
                          createVNode("span", {
                            class: [stat.trendColor, "text-[11px] font-bold flex items-center gap-1"]
                          }, [
                            createVNode(_component_Icon, {
                              name: stat.trendIcon,
                              size: "12"
                            }, null, 8, ["name"]),
                            createTextVNode(" " + toDisplayString(stat.trend), 1)
                          ], 2),
                          createVNode("span", { class: "text-[10px] text-slate-400 uppercase font-bold tracking-tighter" }, "vs last month")
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1" }, toDisplayString(stat.title), 1),
                        createVNode("h4", { class: "text-2xl font-bold text-slate-800 dark:text-white" }, toDisplayString(stat.value), 1)
                      ])
                    ]);
                  }), 64))
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 bg-white dark:bg-custom-sidebar p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                      createVNode("h5", { class: "text-[15px] font-bold text-slate-800 dark:text-white" }, "School Activity Overview"),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("button", { class: "p-1.5 text-slate-400 hover:text-primary transition-colors" }, [
                          createVNode(_component_Icon, {
                            name: "ph:dots-three-outline-vertical-fill",
                            size: "16"
                          })
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-xl bg-slate-50/50 dark:bg-white/5 group" }, [
                      createVNode(_component_Icon, {
                        name: "ph:chart-line-up-bold",
                        size: "48",
                        class: "text-slate-300 dark:text-white/10 mb-4 transition-transform group-hover:scale-110"
                      }),
                      createVNode("p", { class: "text-[13px] text-slate-400 font-medium" }, "Activity Chart Visualization")
                    ])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-custom-sidebar p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                      createVNode("h5", { class: "text-[15px] font-bold text-slate-800 dark:text-white" }, "Akses Cepat")
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(shortcuts, (menu) => {
                        return createVNode(_component_NuxtLink, {
                          key: menu.name,
                          to: menu.to,
                          class: "flex flex-col items-center p-3 rounded-lg border border-slate-100 dark:border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all text-center group"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              class: `w-10 h-10 rounded-lg flex items-center justify-center bg-${menu.color}-50 dark:bg-${menu.color}-900/20 text-${menu.color}-600 mb-2 group-hover:scale-110 transition-transform`
                            }, [
                              createVNode(_component_Icon, {
                                name: menu.icon,
                                size: "20"
                              }, null, 8, ["name"])
                            ], 2),
                            createVNode("span", { class: "text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight" }, toDisplayString(menu.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"]);
                      }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sekolah/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-XtW-oqd9.mjs.map
