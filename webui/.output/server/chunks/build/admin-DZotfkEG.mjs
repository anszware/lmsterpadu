import { _ as __nuxt_component_0 } from './nuxt-link-BGJgSZtr.mjs';
import __nuxt_component_0$1 from './index-ZpQ2fISz.mjs';
import { ref, mergeProps, unref, computed, withCtx, createVNode, openBlock, createBlock, createTextVNode, createCommentVNode, toDisplayString, resolveDirective, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr } from 'vue/server-renderer';
import { u as useCookie } from './cookie-D7ajVlMO.mjs';
import { g as useState, e as useRuntimeConfig } from './server.mjs';
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
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'pinia';
import 'vue-router';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$2 = {
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  props: ["isOpen", "isCollapsed"],
  setup(__props) {
    const userRole = useCookie("user_role");
    const menuGroups = computed(() => {
      const groups = [];
      if (userRole.value === "admin") {
        groups.push(
          {
            title: "Main",
            items: [
              { name: "Dashboards", icon: "ph:house-duotone", to: "/admin" },
              { name: "User Management", icon: "ph:users-duotone", to: "/admin/users" }
            ]
          },
          {
            title: "Master Data",
            items: [
              { name: "Jurusan", icon: "ph:graduation-cap-duotone", to: "/admin/jurusan" },
              { name: "Sekolah", icon: "ph:building-office", to: "/admin/sekolah" }
            ]
          }
        );
      }
      if (userRole.value === "pic") {
        groups.push(
          {
            title: "Sekolah",
            items: [
              { name: "Dashboard", icon: "ph:house-duotone", to: "/sekolah" },
              { name: "Manajemen Jurusan", icon: "ph:graduation-cap-duotone", to: "/sekolah/jurusan" },
              { name: "Data Siswa", icon: "ph:student-duotone", to: "/sekolah/siswa" },
              { name: "Data Guru", icon: "ph:chalkboard-teacher-duotone", to: "/sekolah/guru" }
            ]
          }
        );
      }
      if (userRole.value === "teacher") {
        groups.push(
          {
            title: "Guru",
            items: [
              { name: "Dashboard", icon: "ph:house-duotone", to: "/guru" },
              { name: "Materi Saya", icon: "ph:book-open-duotone", to: "/guru/courses" }
            ]
          }
        );
      }
      if (userRole.value === "student") {
        groups.push(
          {
            title: "Siswa",
            items: [
              { name: "Dashboard", icon: "ph:house-duotone", to: "/siswa" },
              { name: "Nilai Saya", icon: "ph:chart-bar-duotone", to: "/siswa/my-grades" }
            ]
          }
        );
      }
      return groups;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "h-full bg-white dark:bg-[#111c43] text-slate-600 dark:text-[#a3afbb] transition-all duration-300 overflow-y-auto overflow-x-hidden border border-slate-200 dark:border-white/5 shadow-xl w-full" }, _attrs))}><div class="h-16 flex items-center justify-center border-b border-slate-100 dark:border-white/5 px-4 mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "flex items-center gap-2.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:graduation-cap-fill",
              class: "text-white text-xl"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (!__props.isCollapsed) {
              _push2(`<span class="font-bold text-xl text-slate-800 dark:text-white tracking-tight"${_scopeId}>YNEX <span class="text-primary opacity-80"${_scopeId}>Edu</span></span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20" }, [
                createVNode(_component_Icon, {
                  name: "ph:graduation-cap-fill",
                  class: "text-white text-xl"
                })
              ]),
              !__props.isCollapsed ? (openBlock(), createBlock("span", {
                key: 0,
                class: "font-bold text-xl text-slate-800 dark:text-white tracking-tight"
              }, [
                createTextVNode("YNEX "),
                createVNode("span", { class: "text-primary opacity-80" }, "Edu")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="py-2 px-3 space-y-1"><!--[-->`);
      ssrRenderList(unref(menuGroups), (group) => {
        _push(`<div>`);
        if (!__props.isCollapsed) {
          _push(`<p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4 opacity-70 dark:opacity-40">${ssrInterpolate(group.title)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-1"><!--[-->`);
        ssrRenderList(group.items, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.name,
            to: item.to,
            class: ["flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden", [
              _ctx.$route.path === item.to ? "bg-primary/5 dark:bg-white/5 text-primary dark:text-white" : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-[#a3afbb] hover:text-primary dark:hover:text-white"
            ]]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (_ctx.$route.path === item.to) {
                  _push2(`<div class="absolute right-0 top-2 bottom-2 w-1 bg-primary rounded-l-full"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(ssrRenderComponent(_component_Icon, {
                  name: item.icon,
                  size: "20",
                  class: ["flex-shrink-0 transition-colors", [
                    _ctx.$route.path === item.to ? "text-primary" : "group-hover:text-primary"
                  ]]
                }, null, _parent2, _scopeId));
                if (!__props.isCollapsed) {
                  _push2(`<span class="text-[13px] font-medium whitespace-nowrap"${_scopeId}>${ssrInterpolate(item.name)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (!__props.isCollapsed && item.badge) {
                  _push2(`<span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-bold shadow-sm"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  _ctx.$route.path === item.to ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute right-0 top-2 bottom-2 w-1 bg-primary rounded-l-full"
                  })) : createCommentVNode("", true),
                  createVNode(_component_Icon, {
                    name: item.icon,
                    size: "20",
                    class: ["flex-shrink-0 transition-colors", [
                      _ctx.$route.path === item.to ? "text-primary" : "group-hover:text-primary"
                    ]]
                  }, null, 8, ["name", "class"]),
                  !__props.isCollapsed ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: "text-[13px] font-medium whitespace-nowrap"
                  }, toDisplayString(item.name), 1)) : createCommentVNode("", true),
                  !__props.isCollapsed && item.badge ? (openBlock(), createBlock("span", {
                    key: 2,
                    class: "ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-bold shadow-sm"
                  }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></aside>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$1 = {
  __name: "AdminNavbar",
  __ssrInlineRender: true,
  props: ["isCollapsed"],
  setup(__props) {
    useColorMode();
    const isDark = ref(false);
    const userName = useCookie("user_name");
    const userRole = useCookie("user_role");
    const userFoto = useCookie("user_foto");
    const config = useRuntimeConfig();
    const userAvatar = computed(() => {
      if (userFoto.value) {
        const baseUrl = config.public.apiBase.replace("/api", "");
        return `${baseUrl}/storage/${userFoto.value}`;
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value || "User")}&background=0D8ABC&color=fff`;
    });
    ref(false);
    const isProfileOpen = ref(false);
    const isNotificationsOpen = ref(false);
    ref(false);
    const closeNotifications = () => {
      isNotificationsOpen.value = false;
    };
    const closeProfile = () => {
      isProfileOpen.value = false;
    };
    const notifications = [
      { id: 1, title: "New Student Registered", message: "Ahmad Fauzi has registered as a new student in SMKN 1 Jakarta.", time: "5 mins ago", icon: "ph:user-plus-bold", bgColor: "bg-primary" },
      { id: 2, title: "System Update", message: "The system has been updated to version 2.4.0. Check the changelog for details.", time: "2 hours ago", icon: "ph:arrow-clockwise-bold", bgColor: "bg-info" },
      { id: 3, title: "Export Completed", message: "Your school report export is ready for download.", time: "5 hours ago", icon: "ph:file-arrow-down-bold", bgColor: "bg-success" },
      { id: 4, title: "Security Alert", message: "New login detected from a new IP address: 192.168.1.45.", time: "1 day ago", icon: "ph:shield-warning-bold", bgColor: "bg-warning" }
    ];
    const apps = [
      { name: "Github", icon: "ph:github-logo", color: "bg-slate-800" },
      { name: "G-Mail", icon: "ph:envelope", color: "bg-red-500" },
      { name: "Calendar", icon: "ph:calendar", color: "bg-blue-500" },
      { name: "Map", icon: "ph:map-trifold", color: "bg-green-500" },
      { name: "Shop", icon: "ph:shopping-cart", color: "bg-orange-500" },
      { name: "Chat", icon: "ph:chat-centered-text", color: "bg-indigo-500" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_click_outside = resolveDirective("click-outside");
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-[#111c43] h-16 flex items-center justify-between px-6 transition-all duration-300 relative w-full" }, _attrs))}><div class="flex items-center gap-4 flex-grow"><button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ph:list-bold",
        size: "20"
      }, null, _parent));
      _push(`</button><div class="hidden md:flex items-center bg-slate-100 dark:bg-white/5 rounded-lg px-4 py-2 border border-transparent focus-within:border-primary/20 focus-within:bg-white dark:focus-within:bg-[#111c43] transition-all group max-w-xs lg:max-w-md w-full">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ph:magnifying-glass",
        size: "18",
        class: "text-slate-400 group-focus-within:text-primary"
      }, null, _parent));
      _push(`<input type="text" placeholder="Search..." class="bg-transparent border-none text-[13px] focus:ring-0 w-full placeholder:text-slate-400 ml-2"></div></div><div class="flex items-center gap-1.5 flex-shrink-0"><button class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors relative group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(isDark) ? "ph:sun-bold" : "ph:moon-bold",
        size: "20"
      }, null, _parent));
      _push(`</button><div class="relative"><button class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors relative group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ph:bell-bold",
        size: "20"
      }, null, _parent));
      _push(`<span class="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-white dark:border-[#111c43]"></span></button>`);
      if (unref(isNotificationsOpen)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute right-0 mt-3 w-80 bg-white dark:bg-[#111c43] rounded-xl shadow-2xl border border-slate-100 dark:border-white/5 z-[60] overflow-hidden" }, ssrGetDirectiveProps(_ctx, _directive_click_outside, closeNotifications)))}><div class="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between"><h6 class="text-[14px] font-bold text-slate-800 dark:text-white">Notifications</h6><span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">4 NEW</span></div><div class="max-h-[350px] overflow-y-auto"><!--[-->`);
        ssrRenderList(notifications, (notif) => {
          _push(`<div class="px-5 py-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors flex gap-3"><div class="${ssrRenderClass([notif.bgColor, "w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"])}">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: notif.icon,
            size: "18"
          }, null, _parent));
          _push(`</div><div class="flex-grow"><p class="text-[12px] font-bold text-slate-800 dark:text-white mb-0.5">${ssrInterpolate(notif.title)}</p><p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">${ssrInterpolate(notif.message)}</p><p class="text-[10px] text-slate-400 mt-1 font-medium">${ssrInterpolate(notif.time)}</p></div></div>`);
        });
        _push(`<!--]--></div><div class="p-2"><button class="w-full py-2 text-[12px] font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">View All Notifications</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative group"><button class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ph:squares-four-bold",
        size: "20"
      }, null, _parent));
      _push(`</button><div class="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#111c43] rounded-xl shadow-2xl border border-slate-100 dark:border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-4 grid grid-cols-3 gap-4 z-50"><!--[-->`);
      ssrRenderList(apps, (app) => {
        _push(`<div class="flex flex-col items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg cursor-pointer group/app"><div class="${ssrRenderClass([app.color, "w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover/app:scale-110"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: app.icon,
          size: "20"
        }, null, _parent));
        _push(`</div><span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">${ssrInterpolate(app.name)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="relative ml-2"><button class="flex items-center gap-3 p-1 pr-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all"><img${ssrRenderAttr("src", unref(userAvatar))} class="w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 object-cover shadow-sm"${ssrRenderAttr("alt", unref(userName))}><div class="hidden lg:block text-left leading-tight"><p class="text-[13px] font-bold text-slate-800 dark:text-white">${ssrInterpolate(unref(userName))}</p><p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider opacity-70">${ssrInterpolate(unref(userRole))}</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ph:caret-down-bold",
        size: "10",
        class: "text-slate-400"
      }, null, _parent));
      _push(`</button>`);
      if (unref(isProfileOpen)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#111c43] rounded-xl shadow-2xl border border-slate-100 dark:border-white/5 z-[60] py-2 overflow-hidden" }, ssrGetDirectiveProps(_ctx, _directive_click_outside, closeProfile)))}><div class="px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5"><p class="text-[13px] font-bold text-slate-800 dark:text-white truncate">${ssrInterpolate(unref(userName))}</p><p class="text-[11px] text-slate-400 font-medium truncate opacity-80">${ssrInterpolate(unref(userRole))}</p></div><div class="p-1.5">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/profile",
          class: "flex items-center gap-3 px-3.5 py-2.5 text-[13px] text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:user-circle-bold",
                size: "20",
                class: "text-slate-400 group-hover:text-primary"
              }, null, _parent2, _scopeId));
              _push2(` Profile `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "ph:user-circle-bold",
                  size: "20",
                  class: "text-slate-400 group-hover:text-primary"
                }),
                createTextVNode(" Profile ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/settings",
          class: "flex items-center gap-3 px-3.5 py-2.5 text-[13px] text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:gear-six-bold",
                size: "20",
                class: "text-slate-400 group-hover:text-primary"
              }, null, _parent2, _scopeId));
              _push2(` Settings `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "ph:gear-six-bold",
                  size: "20",
                  class: "text-slate-400 group-hover:text-primary"
                }),
                createTextVNode(" Settings ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="my-1.5 border-t border-slate-100 dark:border-white/5"></div><button class="w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] text-danger hover:bg-danger/10 rounded-lg transition-colors group">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ph:sign-out-bold",
          size: "20",
          class: "text-danger/70 group-hover:text-danger"
        }, null, _parent));
        _push(` Log Out </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const isSidebarOpen = ref(false);
    const isSidebarCollapsed = ref(false);
    const toggleSidebar = () => {
      if ((void 0).innerWidth >= 768) {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
      } else {
        isSidebarOpen.value = !isSidebarOpen.value;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminSidebar = _sfc_main$2;
      const _component_AdminNavbar = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#f0f1f7] dark:bg-dark font-inter text-slate-900 dark:text-slate-100 transition-colors duration-300 flex" }, _attrs))}><div class="${ssrRenderClass([[
        unref(isSidebarCollapsed) ? "w-24" : "w-64",
        unref(isSidebarOpen) ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      ], "fixed inset-y-0 left-0 z-50 transition-all duration-300 p-3"])}">`);
      _push(ssrRenderComponent(_component_AdminSidebar, {
        "is-open": unref(isSidebarOpen),
        "is-collapsed": unref(isSidebarCollapsed),
        onToggleMobile: ($event) => isSidebarOpen.value = false,
        class: "h-full rounded-2xl shadow-xl"
      }, null, _parent));
      _push(`</div><div class="${ssrRenderClass([[
        unref(isSidebarCollapsed) ? "md:pl-24" : "md:pl-64"
      ], "flex-grow transition-all duration-300 flex flex-col min-h-screen relative"])}"><div class="p-3 sticky top-0 z-30 w-full">`);
      _push(ssrRenderComponent(_component_AdminNavbar, {
        "is-collapsed": unref(isSidebarCollapsed),
        onToggleSidebar: toggleSidebar,
        onToggleMobile: ($event) => isSidebarOpen.value = true,
        class: "rounded-xl shadow-sm border border-slate-200 dark:border-white/5 mx-auto"
      }, null, _parent));
      _push(`</div><main class="flex-grow p-4 md:p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="p-4 text-center text-xs text-slate-500 dark:text-slate-400"> Copyright © 2026 <span class="font-bold text-slate-900 dark:text-white uppercase">YNEX</span>. Designed with ❤️ by <span class="text-primary font-semibold">Spruko</span> All rights reserved </footer></div>`);
      if (unref(isSidebarOpen)) {
        _push(`<div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-DZotfkEG.mjs.map
