import { _ as _export_sfc, d as useAsyncData, c as __nuxt_component_0, r as refreshNuxtData } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import __nuxt_component_0$2 from './index-ZpQ2fISz.mjs';
import { ref, withAsyncContext, computed, reactive, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, toDisplayString, withModifiers, withDirectives, vModelText, Fragment, vModelSelect, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { u as useApi } from './useApi-BTut_o5P.mjs';
import { u as useAlert } from './useAlert-CKkjru5E.mjs';
import { u as useWilayah } from './useWilayah-CgzkWwbs.mjs';
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
  __name: "profile",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { get, post } = useApi();
    const { showAlert } = useAlert();
    const activeTab = ref("profile");
    const { data: user, pending, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "profile-me",
      () => get("/me"),
      {
        // Memastikan data person tidak null sebelum di-render
        transform: (data) => {
          if (!data.person) {
            data.person = {};
          }
          return data;
        }
      }
    )), __temp = await __temp, __restore(), __temp);
    const tempat_tanggal_lahir = computed(() => {
      if (user.value && user.value.person) {
        const tempat = user.value.person.tempat_lahir || "Unknown";
        const tanggal = user.value.person.tanggal_lahir ? new Date(user.value.person.tanggal_lahir).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }) : "Unknown";
        return `${tempat}, ${tanggal}`;
      }
      return "Unknown";
    });
    tempat_tanggal_lahir.value;
    const gender = computed(() => {
      if (user.value && user.value.person) {
        return user.value.person.gender === "L" ? "Laki-laki" : "Perempuan";
      }
      return "Unknown";
    });
    const { fetchProvinsi, fetchKota: getKotas, fetchKecamatan: getKecamatans, fetchKelurahan: getKelurahans } = useWilayah();
    const isEditing = ref(false);
    const updating = ref(false);
    const provinsis = ref([]);
    const kotas = ref([]);
    const kecamatans = ref([]);
    const kelurahans = ref([]);
    const form = reactive({
      full_name: "",
      nik: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      gender: "",
      no_hp: "",
      alamat: "",
      rt: "",
      rw: "",
      provinsi_id: "",
      kota_id: "",
      kecamatan_id: "",
      kelurahan_id: ""
    });
    const fetchKota = async () => {
      kotas.value = await getKotas(form.provinsi_id);
    };
    const fetchKecamatan = async () => {
      kecamatans.value = await getKecamatans(form.kota_id);
    };
    const fetchKelurahan = async () => {
      kelurahans.value = await getKelurahans(form.kecamatan_id);
    };
    const initForm = () => {
      if (user.value && user.value.person) {
        const p = user.value.person;
        form.full_name = p.full_name || "";
        form.nik = p.nik || "";
        form.tempat_lahir = p.tempat_lahir || "";
        form.tanggal_lahir = p.tanggal_lahir || "";
        form.gender = p.gender || "L";
        form.no_hp = p.no_hp || "";
        form.alamat = p.alamat || "";
        form.rt = p.rt || "";
        form.rw = p.rw || "";
        form.provinsi_id = p.provinsi_id || "";
        form.kota_id = p.kota_id || "";
        form.kecamatan_id = p.kecamatan_id || "";
        form.kelurahan_id = p.kelurahan_id || "";
        if (form.provinsi_id) fetchKota();
        if (form.kota_id) fetchKecamatan();
        if (form.kecamatan_id) fetchKelurahan();
      }
    };
    watch(user, (newVal) => {
      if (newVal) initForm();
    }, { immediate: true });
    const toggleEdit = async () => {
      if (!isEditing.value) {
        if (provinsis.value.length === 0) {
          provinsis.value = await fetchProvinsi();
        }
        initForm();
      }
      isEditing.value = !isEditing.value;
    };
    const updateProfile = async () => {
      updating.value = true;
      try {
        await post("/profile", {
          ...form
        });
        await refreshNuxtData("profile-me");
        isEditing.value = false;
        showAlert({
          title: "Berhasil!",
          text: "Profil berhasil diperbarui!",
          icon: "success",
          timer: 1500
        });
      } catch (e) {
        console.error("Failed to update profile", e);
        showAlert(e.data?.message || "Terjadi kesalahan saat memperbarui profil.", "error");
      } finally {
        updating.value = false;
      }
    };
    if (error.value) {
      console.error("Pesan Error:", error.value.data?.message || error.value.message);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" data-v-d97899fe${_scopeId}><h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize" data-v-d97899fe${_scopeId}>User Profile</h1><nav class="flex items-center space-x-2 text-sm" data-v-d97899fe${_scopeId}>`);
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
            _push2(`<span class="text-slate-500 dark:text-slate-400" data-v-d97899fe${_scopeId}>Profile</span></nav></div>`);
            if (unref(pending)) {
              _push2(`<div class="p-6 text-center text-slate-500" data-v-d97899fe${_scopeId}> Mengambil data profil... </div>`);
            } else if (unref(user)) {
              _push2(`<div class="p-6" data-v-d97899fe${_scopeId}><div class="grid grid-cols-12 gap-6" data-v-d97899fe${_scopeId}><div class="col-span-12 lg:col-span-4" data-v-d97899fe${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6 text-center" data-v-d97899fe${_scopeId}><div class="relative inline-block mb-4" data-v-d97899fe${_scopeId}><img${ssrRenderAttr("src", unref(user).person?.foto || `https://ui-avatars.com/api/?name=${unref(user).person?.full_name || unref(user).username}&background=0D8ABC&color=fff`)} class="w-32 h-32 rounded-full border-4 border-slate-50 dark:border-slate-700 shadow-md object-cover" alt="Profile Photo" data-v-d97899fe${_scopeId}><button class="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg" data-v-d97899fe${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:camera-bold",
                size: "16"
              }, null, _parent2, _scopeId));
              _push2(`</button></div><h2 class="text-xl font-bold text-slate-800 dark:text-white" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(user).person?.full_name || "User")}</h2><span class="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/30 dark:text-blue-400 font-bold uppercase tracking-wider" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(user).role?.role || "User")}</span><div class="mt-8 text-left space-y-4" data-v-d97899fe${_scopeId}><h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider" data-v-d97899fe${_scopeId}>Account Information</h3><div class="flex items-center gap-3" data-v-d97899fe${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:user-circle-bold",
                class: "text-slate-400",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(`<div data-v-d97899fe${_scopeId}><p class="text-xs text-slate-400" data-v-d97899fe${_scopeId}>Username</p><p class="text-sm font-medium text-slate-700 dark:text-slate-200" data-v-d97899fe${_scopeId}>@${ssrInterpolate(unref(user).username)}</p></div></div><div class="flex items-center gap-3" data-v-d97899fe${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:envelope-simple-bold",
                class: "text-slate-400",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(`<div data-v-d97899fe${_scopeId}><p class="text-xs text-slate-400" data-v-d97899fe${_scopeId}>Email Address</p><p class="text-sm font-medium text-slate-700 dark:text-slate-200" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(user).email)}</p></div></div><div class="flex items-center gap-3" data-v-d97899fe${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:phone-bold",
                class: "text-slate-400",
                size: "20"
              }, null, _parent2, _scopeId));
              _push2(`<div data-v-d97899fe${_scopeId}><p class="text-xs text-slate-400" data-v-d97899fe${_scopeId}>Nomor HP</p><p class="text-sm font-medium text-slate-700 dark:text-slate-200" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(user).person?.no_hp || "-")}</p></div></div></div></div></div><div class="col-span-12 lg:col-span-8" data-v-d97899fe${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden" data-v-d97899fe${_scopeId}><div class="flex border-b dark:border-slate-700 overflow-x-auto bg-slate-50/50 dark:bg-slate-800/50" data-v-d97899fe${_scopeId}><button class="${ssrRenderClass([unref(activeTab) === "profile" ? "border-blue-600 text-blue-600 border-b-2" : "text-slate-500", "px-6 py-4 font-medium text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"])}" data-v-d97899fe${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, { name: "ph:user-bold" }, null, _parent2, _scopeId));
              _push2(` Profile Data </button><button class="${ssrRenderClass([unref(activeTab) === "security" ? "border-blue-600 text-blue-600 border-b-2" : "text-slate-500", "px-6 py-4 font-medium text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"])}" data-v-d97899fe${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, { name: "ph:lock-bold" }, null, _parent2, _scopeId));
              _push2(` Security </button></div><div class="p-6" data-v-d97899fe${_scopeId}>`);
              if (unref(activeTab) === "profile") {
                _push2(`<div class="space-y-6 animate-fade-in" data-v-d97899fe${_scopeId}><div class="flex justify-between items-center pb-4 border-b dark:border-slate-700" data-v-d97899fe${_scopeId}><h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider" data-v-d97899fe${_scopeId}> Personal Details </h3><button class="${ssrRenderClass([unref(isEditing) ? "bg-slate-200 text-slate-700 hover:bg-slate-300" : "bg-blue-600 text-white hover:bg-blue-700", "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"])}" data-v-d97899fe${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: unref(isEditing) ? "ph:x-bold" : "ph:pencil-simple-bold",
                  size: "14"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(unref(isEditing) ? "Cancel" : "Edit Profile")}</button></div><form class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-d97899fe${_scopeId}><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Full Name</label><input type="text"${ssrRenderAttr("value", unref(form).full_name)}${ssrIncludeBooleanAttr(!unref(isEditing)) ? " disabled" : ""} class="${ssrRenderClass([{ "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(isEditing) }, "form-input-custom"])}" data-v-d97899fe${_scopeId}></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>NIK / ID Number</label><input type="text"${ssrRenderAttr("value", unref(form).nik)}${ssrIncludeBooleanAttr(!unref(isEditing)) ? " disabled" : ""} class="${ssrRenderClass([{ "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(isEditing) }, "form-input-custom"])}" data-v-d97899fe${_scopeId}></div>`);
                if (!unref(isEditing)) {
                  _push2(`<!--[--><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Tempat Tanggal Lahir</label><div class="form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(tempat_tanggal_lahir))}</div></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Jenis Kelamin</label><div class="form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(gender))}</div></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Nomor HP</label><div class="form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(user).person?.no_hp || "-")}</div></div><div class="flex flex-col gap-2 md:col-span-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Alamat Lengkap</label><div class="form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed min-h-[60px]" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(user).person?.alamat_lengkap || "-")}</div></div><!--]-->`);
                } else {
                  _push2(`<!--[--><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Tempat Lahir</label><input type="text"${ssrRenderAttr("value", unref(form).tempat_lahir)} class="form-input-custom" data-v-d97899fe${_scopeId}></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Tanggal Lahir</label><input type="date"${ssrRenderAttr("value", unref(form).tanggal_lahir)} class="form-input-custom" data-v-d97899fe${_scopeId}></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Jenis Kelamin</label><select class="form-input-custom" data-v-d97899fe${_scopeId}><option value="L" data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "L") : ssrLooseEqual(unref(form).gender, "L")) ? " selected" : ""}${_scopeId}>Laki-laki</option><option value="P" data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "P") : ssrLooseEqual(unref(form).gender, "P")) ? " selected" : ""}${_scopeId}>Perempuan</option></select></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Nomor HP</label><input type="text"${ssrRenderAttr("value", unref(form).no_hp)} class="form-input-custom" data-v-d97899fe${_scopeId}></div><div class="flex flex-col gap-2 md:col-span-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Alamat Jalan</label><textarea rows="2" class="form-input-custom" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(form).alamat)}</textarea></div><div class="grid grid-cols-2 gap-4" data-v-d97899fe${_scopeId}><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>RT</label><input type="text"${ssrRenderAttr("value", unref(form).rt)} placeholder="000" class="form-input-custom" data-v-d97899fe${_scopeId}></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>RW</label><input type="text"${ssrRenderAttr("value", unref(form).rw)} placeholder="000" class="form-input-custom" data-v-d97899fe${_scopeId}></div></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Provinsi</label><select class="form-input-custom" data-v-d97899fe${_scopeId}><option value="" data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).provinsi_id) ? ssrLooseContain(unref(form).provinsi_id, "") : ssrLooseEqual(unref(form).provinsi_id, "")) ? " selected" : ""}${_scopeId}>Pilih Provinsi</option><!--[-->`);
                  ssrRenderList(unref(provinsis), (item) => {
                    _push2(`<option${ssrRenderAttr("value", item.id)} data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).provinsi_id) ? ssrLooseContain(unref(form).provinsi_id, item.id) : ssrLooseEqual(unref(form).provinsi_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_provinsi)}</option>`);
                  });
                  _push2(`<!--]--></select></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Kota / Kabupaten</label><select${ssrIncludeBooleanAttr(!unref(form).provinsi_id) ? " disabled" : ""} class="${ssrRenderClass([{ "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(form).provinsi_id }, "form-input-custom"])}" data-v-d97899fe${_scopeId}><option value="" data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).kota_id) ? ssrLooseContain(unref(form).kota_id, "") : ssrLooseEqual(unref(form).kota_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kota</option><!--[-->`);
                  ssrRenderList(unref(kotas), (item) => {
                    _push2(`<option${ssrRenderAttr("value", item.id)} data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).kota_id) ? ssrLooseContain(unref(form).kota_id, item.id) : ssrLooseEqual(unref(form).kota_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kota)}</option>`);
                  });
                  _push2(`<!--]--></select></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Kecamatan</label><select${ssrIncludeBooleanAttr(!unref(form).kota_id) ? " disabled" : ""} class="${ssrRenderClass([{ "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(form).kota_id }, "form-input-custom"])}" data-v-d97899fe${_scopeId}><option value="" data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).kecamatan_id) ? ssrLooseContain(unref(form).kecamatan_id, "") : ssrLooseEqual(unref(form).kecamatan_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kecamatan</option><!--[-->`);
                  ssrRenderList(unref(kecamatans), (item) => {
                    _push2(`<option${ssrRenderAttr("value", item.id)} data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).kecamatan_id) ? ssrLooseContain(unref(form).kecamatan_id, item.id) : ssrLooseEqual(unref(form).kecamatan_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kecamatan)}</option>`);
                  });
                  _push2(`<!--]--></select></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Kelurahan / Desa</label><select${ssrIncludeBooleanAttr(!unref(form).kecamatan_id) ? " disabled" : ""} class="${ssrRenderClass([{ "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(form).kecamatan_id }, "form-input-custom"])}" data-v-d97899fe${_scopeId}><option value="" data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).kelurahan_id) ? ssrLooseContain(unref(form).kelurahan_id, "") : ssrLooseEqual(unref(form).kelurahan_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kelurahan</option><!--[-->`);
                  ssrRenderList(unref(kelurahans), (item) => {
                    _push2(`<option${ssrRenderAttr("value", item.id)} data-v-d97899fe${ssrIncludeBooleanAttr(Array.isArray(unref(form).kelurahan_id) ? ssrLooseContain(unref(form).kelurahan_id, item.id) : ssrLooseEqual(unref(form).kelurahan_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kelurahan)}</option>`);
                  });
                  _push2(`<!--]--></select></div><div class="flex justify-end pt-4 border-t dark:border-slate-700 md:col-span-2" data-v-d97899fe${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(updating)) ? " disabled" : ""} class="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50" data-v-d97899fe${_scopeId}>${ssrInterpolate(unref(updating) ? "Saving..." : "Save Changes")}</button></div><!--]-->`);
                }
                _push2(`</form></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(activeTab) === "security") {
                _push2(`<div class="space-y-6 animate-fade-in" data-v-d97899fe${_scopeId}><div class="max-w-md space-y-4" data-v-d97899fe${_scopeId}><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Current Password</label><input type="password" placeholder="********" class="form-input-custom" data-v-d97899fe${_scopeId}></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>New Password</label><input type="password" placeholder="New password" class="form-input-custom" data-v-d97899fe${_scopeId}></div><div class="flex flex-col gap-2" data-v-d97899fe${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-d97899fe${_scopeId}>Confirm New Password</label><input type="password" placeholder="Repeat new password" class="form-input-custom" data-v-d97899fe${_scopeId}></div><div class="pt-2" data-v-d97899fe${_scopeId}><button class="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all" data-v-d97899fe${_scopeId}> Update Password </button></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, [
                createVNode("h1", { class: "text-lg font-semibold text-slate-800 dark:text-white capitalize" }, "User Profile"),
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
                  createVNode("span", { class: "text-slate-500 dark:text-slate-400" }, "Profile")
                ])
              ]),
              unref(pending) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "p-6 text-center text-slate-500"
              }, " Mengambil data profil... ")) : unref(user) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "p-6"
              }, [
                createVNode("div", { class: "grid grid-cols-12 gap-6" }, [
                  createVNode("div", { class: "col-span-12 lg:col-span-4" }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6 text-center" }, [
                      createVNode("div", { class: "relative inline-block mb-4" }, [
                        createVNode("img", {
                          src: unref(user).person?.foto || `https://ui-avatars.com/api/?name=${unref(user).person?.full_name || unref(user).username}&background=0D8ABC&color=fff`,
                          class: "w-32 h-32 rounded-full border-4 border-slate-50 dark:border-slate-700 shadow-md object-cover",
                          alt: "Profile Photo"
                        }, null, 8, ["src"]),
                        createVNode("button", { class: "absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg" }, [
                          createVNode(_component_Icon, {
                            name: "ph:camera-bold",
                            size: "16"
                          })
                        ])
                      ]),
                      createVNode("h2", { class: "text-xl font-bold text-slate-800 dark:text-white" }, toDisplayString(unref(user).person?.full_name || "User"), 1),
                      createVNode("span", { class: "text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/30 dark:text-blue-400 font-bold uppercase tracking-wider" }, toDisplayString(unref(user).role?.role || "User"), 1),
                      createVNode("div", { class: "mt-8 text-left space-y-4" }, [
                        createVNode("h3", { class: "text-xs font-semibold text-slate-400 uppercase tracking-wider" }, "Account Information"),
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode(_component_Icon, {
                            name: "ph:user-circle-bold",
                            class: "text-slate-400",
                            size: "20"
                          }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-xs text-slate-400" }, "Username"),
                            createVNode("p", { class: "text-sm font-medium text-slate-700 dark:text-slate-200" }, "@" + toDisplayString(unref(user).username), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode(_component_Icon, {
                            name: "ph:envelope-simple-bold",
                            class: "text-slate-400",
                            size: "20"
                          }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-xs text-slate-400" }, "Email Address"),
                            createVNode("p", { class: "text-sm font-medium text-slate-700 dark:text-slate-200" }, toDisplayString(unref(user).email), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode(_component_Icon, {
                            name: "ph:phone-bold",
                            class: "text-slate-400",
                            size: "20"
                          }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-xs text-slate-400" }, "Nomor HP"),
                            createVNode("p", { class: "text-sm font-medium text-slate-700 dark:text-slate-200" }, toDisplayString(unref(user).person?.no_hp || "-"), 1)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-span-12 lg:col-span-8" }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 overflow-hidden" }, [
                      createVNode("div", { class: "flex border-b dark:border-slate-700 overflow-x-auto bg-slate-50/50 dark:bg-slate-800/50" }, [
                        createVNode("button", {
                          onClick: ($event) => activeTab.value = "profile",
                          class: [unref(activeTab) === "profile" ? "border-blue-600 text-blue-600 border-b-2" : "text-slate-500", "px-6 py-4 font-medium text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"]
                        }, [
                          createVNode(_component_Icon, { name: "ph:user-bold" }),
                          createTextVNode(" Profile Data ")
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => activeTab.value = "security",
                          class: [unref(activeTab) === "security" ? "border-blue-600 text-blue-600 border-b-2" : "text-slate-500", "px-6 py-4 font-medium text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"]
                        }, [
                          createVNode(_component_Icon, { name: "ph:lock-bold" }),
                          createTextVNode(" Security ")
                        ], 10, ["onClick"])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        unref(activeTab) === "profile" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-6 animate-fade-in"
                        }, [
                          createVNode("div", { class: "flex justify-between items-center pb-4 border-b dark:border-slate-700" }, [
                            createVNode("h3", { class: "text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider" }, " Personal Details "),
                            createVNode("button", {
                              onClick: toggleEdit,
                              class: [unref(isEditing) ? "bg-slate-200 text-slate-700 hover:bg-slate-300" : "bg-blue-600 text-white hover:bg-blue-700", "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"]
                            }, [
                              createVNode(_component_Icon, {
                                name: unref(isEditing) ? "ph:x-bold" : "ph:pencil-simple-bold",
                                size: "14"
                              }, null, 8, ["name"]),
                              createTextVNode(" " + toDisplayString(unref(isEditing) ? "Cancel" : "Edit Profile"), 1)
                            ], 2)
                          ]),
                          createVNode("form", {
                            onSubmit: withModifiers(updateProfile, ["prevent"]),
                            class: "grid grid-cols-1 md:grid-cols-2 gap-6"
                          }, [
                            createVNode("div", { class: "flex flex-col gap-2" }, [
                              createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Full Name"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => unref(form).full_name = $event,
                                disabled: !unref(isEditing),
                                class: ["form-input-custom", { "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(isEditing) }]
                              }, null, 10, ["onUpdate:modelValue", "disabled"]), [
                                [vModelText, unref(form).full_name]
                              ])
                            ]),
                            createVNode("div", { class: "flex flex-col gap-2" }, [
                              createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "NIK / ID Number"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => unref(form).nik = $event,
                                disabled: !unref(isEditing),
                                class: ["form-input-custom", { "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(isEditing) }]
                              }, null, 10, ["onUpdate:modelValue", "disabled"]), [
                                [vModelText, unref(form).nik]
                              ])
                            ]),
                            !unref(isEditing) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Tempat Tanggal Lahir"),
                                createVNode("div", { class: "form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed" }, toDisplayString(unref(tempat_tanggal_lahir)), 1)
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Jenis Kelamin"),
                                createVNode("div", { class: "form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed" }, toDisplayString(unref(gender)), 1)
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Nomor HP"),
                                createVNode("div", { class: "form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed" }, toDisplayString(unref(user).person?.no_hp || "-"), 1)
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2 md:col-span-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Alamat Lengkap"),
                                createVNode("div", { class: "form-input-custom bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed min-h-[60px]" }, toDisplayString(unref(user).person?.alamat_lengkap || "-"), 1)
                              ])
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Tempat Lahir"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => unref(form).tempat_lahir = $event,
                                  class: "form-input-custom"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).tempat_lahir]
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Tanggal Lahir"),
                                withDirectives(createVNode("input", {
                                  type: "date",
                                  "onUpdate:modelValue": ($event) => unref(form).tanggal_lahir = $event,
                                  class: "form-input-custom"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).tanggal_lahir]
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Jenis Kelamin"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => unref(form).gender = $event,
                                  class: "form-input-custom"
                                }, [
                                  createVNode("option", { value: "L" }, "Laki-laki"),
                                  createVNode("option", { value: "P" }, "Perempuan")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(form).gender]
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Nomor HP"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => unref(form).no_hp = $event,
                                  class: "form-input-custom"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).no_hp]
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2 md:col-span-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Alamat Jalan"),
                                withDirectives(createVNode("textarea", {
                                  rows: "2",
                                  "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                                  class: "form-input-custom"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).alamat]
                                ])
                              ]),
                              createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                                createVNode("div", { class: "flex flex-col gap-2" }, [
                                  createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "RT"),
                                  withDirectives(createVNode("input", {
                                    type: "text",
                                    "onUpdate:modelValue": ($event) => unref(form).rt = $event,
                                    placeholder: "000",
                                    class: "form-input-custom"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).rt]
                                  ])
                                ]),
                                createVNode("div", { class: "flex flex-col gap-2" }, [
                                  createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "RW"),
                                  withDirectives(createVNode("input", {
                                    type: "text",
                                    "onUpdate:modelValue": ($event) => unref(form).rw = $event,
                                    placeholder: "000",
                                    class: "form-input-custom"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).rw]
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Provinsi"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => unref(form).provinsi_id = $event,
                                  onChange: fetchKota,
                                  class: "form-input-custom"
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Provinsi"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(provinsis), (item) => {
                                    return openBlock(), createBlock("option", {
                                      key: item.id,
                                      value: item.id
                                    }, toDisplayString(item.nama_provinsi), 9, ["value"]);
                                  }), 128))
                                ], 40, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(form).provinsi_id]
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kota / Kabupaten"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => unref(form).kota_id = $event,
                                  disabled: !unref(form).provinsi_id,
                                  onChange: fetchKecamatan,
                                  class: ["form-input-custom", { "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(form).provinsi_id }]
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Kota"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(kotas), (item) => {
                                    return openBlock(), createBlock("option", {
                                      key: item.id,
                                      value: item.id
                                    }, toDisplayString(item.nama_kota), 9, ["value"]);
                                  }), 128))
                                ], 42, ["onUpdate:modelValue", "disabled"]), [
                                  [vModelSelect, unref(form).kota_id]
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kecamatan"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => unref(form).kecamatan_id = $event,
                                  disabled: !unref(form).kota_id,
                                  onChange: fetchKelurahan,
                                  class: ["form-input-custom", { "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(form).kota_id }]
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Kecamatan"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(kecamatans), (item) => {
                                    return openBlock(), createBlock("option", {
                                      key: item.id,
                                      value: item.id
                                    }, toDisplayString(item.nama_kecamatan), 9, ["value"]);
                                  }), 128))
                                ], 42, ["onUpdate:modelValue", "disabled"]), [
                                  [vModelSelect, unref(form).kecamatan_id]
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col gap-2" }, [
                                createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kelurahan / Desa"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => unref(form).kelurahan_id = $event,
                                  disabled: !unref(form).kecamatan_id,
                                  class: ["form-input-custom", { "bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed": !unref(form).kecamatan_id }]
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Kelurahan"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(kelurahans), (item) => {
                                    return openBlock(), createBlock("option", {
                                      key: item.id,
                                      value: item.id
                                    }, toDisplayString(item.nama_kelurahan), 9, ["value"]);
                                  }), 128))
                                ], 10, ["onUpdate:modelValue", "disabled"]), [
                                  [vModelSelect, unref(form).kelurahan_id]
                                ])
                              ]),
                              createVNode("div", { class: "flex justify-end pt-4 border-t dark:border-slate-700 md:col-span-2" }, [
                                createVNode("button", {
                                  type: "submit",
                                  disabled: unref(updating),
                                  class: "bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50"
                                }, toDisplayString(unref(updating) ? "Saving..." : "Save Changes"), 9, ["disabled"])
                              ])
                            ], 64))
                          ], 32)
                        ])) : createCommentVNode("", true),
                        unref(activeTab) === "security" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-6 animate-fade-in"
                        }, [
                          createVNode("div", { class: "max-w-md space-y-4" }, [
                            createVNode("div", { class: "flex flex-col gap-2" }, [
                              createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Current Password"),
                              createVNode("input", {
                                type: "password",
                                placeholder: "********",
                                class: "form-input-custom"
                              })
                            ]),
                            createVNode("div", { class: "flex flex-col gap-2" }, [
                              createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "New Password"),
                              createVNode("input", {
                                type: "password",
                                placeholder: "New password",
                                class: "form-input-custom"
                              })
                            ]),
                            createVNode("div", { class: "flex flex-col gap-2" }, [
                              createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Confirm New Password"),
                              createVNode("input", {
                                type: "password",
                                placeholder: "Repeat new password",
                                class: "form-input-custom"
                              })
                            ]),
                            createVNode("div", { class: "pt-2" }, [
                              createVNode("button", { class: "bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all" }, " Update Password ")
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d97899fe"]]);

export { profile as default };
//# sourceMappingURL=profile-BfHaNPAN.mjs.map
