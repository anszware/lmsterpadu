import { f as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useCookie } from './cookie-D7ajVlMO.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const role = defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("access_token");
  const userRole = useCookie("user_role");
  if (!token.value) {
    return navigateTo("/login");
  }
  const allowedRoles = to.meta.allowedRoles;
  if (allowedRoles && !allowedRoles.includes(userRole.value)) {
    if (userRole.value === "admin") return navigateTo("/admin");
    if (userRole.value === "guru") return navigateTo("/guru");
    if (userRole.value === "pic") return navigateTo("/sekolah");
    if (userRole.value === "siswa") return navigateTo("/siswa");
    return navigateTo("/login");
  }
});

export { role as default };
//# sourceMappingURL=role-C4YDf5gw.mjs.map
