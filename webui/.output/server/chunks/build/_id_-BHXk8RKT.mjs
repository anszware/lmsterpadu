import { _ as _export_sfc, a as useRoute, b as useRouter, c as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import __nuxt_component_0$2 from './index-ZpQ2fISz.mjs';
import { ref, reactive, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, withModifiers, withDirectives, vModelText, toDisplayString, createCommentVNode, Fragment, renderList, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { u as useApi } from './useApi-BTut_o5P.mjs';
import { u as useAlert } from './useAlert-CKkjru5E.mjs';
import { u as useWilayah } from './useWilayah-CgzkWwbs.mjs';
import { u as useCookie } from './cookie-D7ajVlMO.mjs';
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
import 'sweetalert2';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { fetchapi } = useApi();
    const { showAlert } = useAlert();
    const { fetchKota, fetchKecamatan, fetchKelurahan } = useWilayah();
    const userId = route.params.id;
    const loading = ref(true);
    const submitting = ref(false);
    const roles = ref([]);
    const provinsis = ref([]);
    const kotas = ref([]);
    const kecamatans = ref([]);
    const kelurahans = ref([]);
    const previewUrl = ref(null);
    const errors = ref({});
    const form = reactive({
      username: "",
      email: "",
      password: "",
      role_id: "",
      nik: "",
      full_name: "",
      gender: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      alamat: "",
      rt: "",
      rw: "",
      provinsi_id: "",
      kota_id: "",
      kecamatan_id: "",
      kelurahan_id: "",
      no_hp: "",
      foto: null
    });
    const onProvinsiChange = async () => {
      form.kota_id = "";
      form.kecamatan_id = "";
      form.kelurahan_id = "";
      kotas.value = await fetchKota(form.provinsi_id);
    };
    const onKotaChange = async () => {
      form.kecamatan_id = "";
      form.kelurahan_id = "";
      kecamatans.value = await fetchKecamatan(form.kota_id);
    };
    const onKecamatanChange = async () => {
      form.kelurahan_id = "";
      kelurahans.value = await fetchKelurahan(form.kecamatan_id);
    };
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        form.foto = file;
        previewUrl.value = URL.createObjectURL(file);
      }
    };
    const submitForm = async () => {
      submitting.value = true;
      errors.value = {};
      try {
        const formData = new FormData();
        formData.append("_method", "PUT");
        for (const key in form) {
          if (form[key] !== null && form[key] !== "") {
            if (key === "password" && form[key] === "") continue;
            formData.append(key, form[key]);
          }
        }
        const token = useCookie("access_token");
        await fetchapi(`/admin/user/${userId}`, {
          method: "POST",
          // Use POST with _method=PUT for FormData support
          body: formData,
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token.value}`
          }
        });
        showAlert({
          title: "Berhasil!",
          text: "Data user telah diperbarui.",
          icon: "success",
          timer: 1500
        });
        router.push("/admin/users");
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
            text: error.data?.message || "Terjadi kesalahan saat memperbarui user.",
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
            _push2(`<div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" data-v-94c926b7${_scopeId}><h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize" data-v-94c926b7${_scopeId}>Edit User</h1><nav class="flex items-center space-x-2 text-sm" data-v-94c926b7${_scopeId}>`);
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
              to: "/admin/users",
              class: "text-blue-500 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`User`);
                } else {
                  return [
                    createTextVNode("User")
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
            _push2(`<span class="text-slate-500 dark:text-slate-400" data-v-94c926b7${_scopeId}>Edit</span></nav></div>`);
            if (unref(loading)) {
              _push2(`<div class="p-12 text-center text-slate-500" data-v-94c926b7${_scopeId}> Memuat data user... </div>`);
            } else {
              _push2(`<div class="p-6" data-v-94c926b7${_scopeId}><form class="grid grid-cols-12 gap-6" data-v-94c926b7${_scopeId}><div class="col-span-12 lg:col-span-4 space-y-6" data-v-94c926b7${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6" data-v-94c926b7${_scopeId}><h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700" data-v-94c926b7${_scopeId}> Informasi Akun </h3><div class="space-y-4" data-v-94c926b7${_scopeId}><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Username</label><input${ssrRenderAttr("value", unref(form).username)} type="text" placeholder="username" class="form-input-custom" required data-v-94c926b7${_scopeId}>`);
              if (unref(errors).username) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).username[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="user@example.com" class="form-input-custom" required data-v-94c926b7${_scopeId}>`);
              if (unref(errors).email) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).email[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Password (Kosongkan jika tidak diubah)</label><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="********" class="form-input-custom" data-v-94c926b7${_scopeId}>`);
              if (unref(errors).password) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).password[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Role User</label><select class="form-input-custom" required data-v-94c926b7${_scopeId}><option value="" data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_id) ? ssrLooseContain(unref(form).role_id, "") : ssrLooseEqual(unref(form).role_id, "")) ? " selected" : ""}${_scopeId}>Pilih Role</option><!--[-->`);
              ssrRenderList(unref(roles), (role) => {
                _push2(`<option${ssrRenderAttr("value", role.id)} data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_id) ? ssrLooseContain(unref(form).role_id, role.id) : ssrLooseEqual(unref(form).role_id, role.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(role.display_name || role.name)}</option>`);
              });
              _push2(`<!--]--></select>`);
              if (unref(errors).role_id) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).role_id[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6" data-v-94c926b7${_scopeId}><h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700" data-v-94c926b7${_scopeId}> Foto Profil </h3><div class="flex flex-col items-center gap-4" data-v-94c926b7${_scopeId}><div class="relative group" data-v-94c926b7${_scopeId}><img${ssrRenderAttr("src", unref(previewUrl) || "https://ui-avatars.com/api/?name=" + unref(form).full_name + "&background=0D8ABC&color=fff")} class="w-32 h-32 rounded-full border-4 border-slate-50 dark:border-slate-700 shadow-md object-cover" data-v-94c926b7${_scopeId}><label class="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg cursor-pointer transition-transform group-hover:scale-110" data-v-94c926b7${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:camera-bold",
                size: "16"
              }, null, _parent2, _scopeId));
              _push2(`<input type="file" class="hidden" accept="image/*" data-v-94c926b7${_scopeId}></label></div><p class="text-[10px] text-slate-400 text-center" data-v-94c926b7${_scopeId}>Format: JPG, PNG, Max 2MB</p></div></div></div><div class="col-span-12 lg:col-span-8" data-v-94c926b7${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6" data-v-94c926b7${_scopeId}><h3 class="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700" data-v-94c926b7${_scopeId}> Data Personal </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-94c926b7${_scopeId}><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>NIK (16 Digit)</label><input${ssrRenderAttr("value", unref(form).nik)} type="text" placeholder="32xxxxxxxxxxxxxx" class="form-input-custom" required maxlength="16" data-v-94c926b7${_scopeId}>`);
              if (unref(errors).nik) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).nik[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Nama Lengkap</label><input${ssrRenderAttr("value", unref(form).full_name)} type="text" placeholder="Nama Lengkap" class="form-input-custom" required data-v-94c926b7${_scopeId}>`);
              if (unref(errors).full_name) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).full_name[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Jenis Kelamin</label><select class="form-input-custom" required data-v-94c926b7${_scopeId}><option value="" data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "") : ssrLooseEqual(unref(form).gender, "")) ? " selected" : ""}${_scopeId}>Pilih Jenis Kelamin</option><option value="L" data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "L") : ssrLooseEqual(unref(form).gender, "L")) ? " selected" : ""}${_scopeId}>Laki-laki</option><option value="P" data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "P") : ssrLooseEqual(unref(form).gender, "P")) ? " selected" : ""}${_scopeId}>Perempuan</option></select>`);
              if (unref(errors).gender) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).gender[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Nomor HP</label><input${ssrRenderAttr("value", unref(form).no_hp)} type="text" placeholder="08xxxxxxxxxx" class="form-input-custom" required data-v-94c926b7${_scopeId}>`);
              if (unref(errors).no_hp) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).no_hp[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Tempat Lahir</label><input${ssrRenderAttr("value", unref(form).tempat_lahir)} type="text" placeholder="Kota Lahir" class="form-input-custom" required data-v-94c926b7${_scopeId}>`);
              if (unref(errors).tempat_lahir) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).tempat_lahir[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Tanggal Lahir</label><input${ssrRenderAttr("value", unref(form).tanggal_lahir)} type="date" class="form-input-custom" required data-v-94c926b7${_scopeId}>`);
              if (unref(errors).tanggal_lahir) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).tanggal_lahir[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-span-1 md:col-span-2 flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Alamat Jalan</label><textarea rows="2" placeholder="Jl. Contoh No. 123" class="form-input-custom" required data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(form).alamat)}</textarea>`);
              if (unref(errors).alamat) {
                _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(errors).alamat[0])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>RT</label><input${ssrRenderAttr("value", unref(form).rt)} type="text" placeholder="001" class="form-input-custom" required data-v-94c926b7${_scopeId}></div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>RW</label><input${ssrRenderAttr("value", unref(form).rw)} type="text" placeholder="001" class="form-input-custom" required data-v-94c926b7${_scopeId}></div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Provinsi</label><select class="form-input-custom" required data-v-94c926b7${_scopeId}><option value="" data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).provinsi_id) ? ssrLooseContain(unref(form).provinsi_id, "") : ssrLooseEqual(unref(form).provinsi_id, "")) ? " selected" : ""}${_scopeId}>Pilih Provinsi</option><!--[-->`);
              ssrRenderList(unref(provinsis), (item) => {
                _push2(`<option${ssrRenderAttr("value", item.id)} data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).provinsi_id) ? ssrLooseContain(unref(form).provinsi_id, item.id) : ssrLooseEqual(unref(form).provinsi_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_provinsi)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Kota / Kabupaten</label><select${ssrIncludeBooleanAttr(!unref(form).provinsi_id) ? " disabled" : ""} class="form-input-custom" required data-v-94c926b7${_scopeId}><option value="" data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).kota_id) ? ssrLooseContain(unref(form).kota_id, "") : ssrLooseEqual(unref(form).kota_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kota</option><!--[-->`);
              ssrRenderList(unref(kotas), (item) => {
                _push2(`<option${ssrRenderAttr("value", item.id)} data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).kota_id) ? ssrLooseContain(unref(form).kota_id, item.id) : ssrLooseEqual(unref(form).kota_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kota)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Kecamatan</label><select${ssrIncludeBooleanAttr(!unref(form).kota_id) ? " disabled" : ""} class="form-input-custom" required data-v-94c926b7${_scopeId}><option value="" data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).kecamatan_id) ? ssrLooseContain(unref(form).kecamatan_id, "") : ssrLooseEqual(unref(form).kecamatan_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kecamatan</option><!--[-->`);
              ssrRenderList(unref(kecamatans), (item) => {
                _push2(`<option${ssrRenderAttr("value", item.id)} data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).kecamatan_id) ? ssrLooseContain(unref(form).kecamatan_id, item.id) : ssrLooseEqual(unref(form).kecamatan_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kecamatan)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="flex flex-col gap-1.5" data-v-94c926b7${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-94c926b7${_scopeId}>Kelurahan / Desa</label><select${ssrIncludeBooleanAttr(!unref(form).kecamatan_id) ? " disabled" : ""} class="form-input-custom" required data-v-94c926b7${_scopeId}><option value="" data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).kelurahan_id) ? ssrLooseContain(unref(form).kelurahan_id, "") : ssrLooseEqual(unref(form).kelurahan_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kelurahan</option><!--[-->`);
              ssrRenderList(unref(kelurahans), (item) => {
                _push2(`<option${ssrRenderAttr("value", item.id)} data-v-94c926b7${ssrIncludeBooleanAttr(Array.isArray(unref(form).kelurahan_id) ? ssrLooseContain(unref(form).kelurahan_id, item.id) : ssrLooseEqual(unref(form).kelurahan_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kelurahan)}</option>`);
              });
              _push2(`<!--]--></select></div></div><div class="mt-8 pt-6 border-t dark:border-slate-700 flex justify-end gap-3" data-v-94c926b7${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/admin/users",
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
              _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50" data-v-94c926b7${_scopeId}>${ssrInterpolate(unref(submitting) ? "Menyimpan..." : "Update User")}</button></div></div></div></form></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, [
                createVNode("h1", { class: "text-lg font-semibold text-slate-800 dark:text-white capitalize" }, "Edit User"),
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
                    to: "/admin/users",
                    class: "text-blue-500 hover:underline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("User")
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
              }, " Memuat data user... ")) : (openBlock(), createBlock("div", {
                key: 1,
                class: "p-6"
              }, [
                createVNode("form", {
                  onSubmit: withModifiers(submitForm, ["prevent"]),
                  class: "grid grid-cols-12 gap-6"
                }, [
                  createVNode("div", { class: "col-span-12 lg:col-span-4 space-y-6" }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6" }, [
                      createVNode("h3", { class: "text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700" }, " Informasi Akun "),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Username"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).username = $event,
                            type: "text",
                            placeholder: "username",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).username]
                          ]),
                          unref(errors).username ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).username[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Email"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            placeholder: "user@example.com",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ]),
                          unref(errors).email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).email[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Password (Kosongkan jika tidak diubah)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: "password",
                            placeholder: "********",
                            class: "form-input-custom"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).password]
                          ]),
                          unref(errors).password ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).password[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Role User"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).role_id = $event,
                            class: "form-input-custom",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih Role"),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                              return openBlock(), createBlock("option", {
                                key: role.id,
                                value: role.id
                              }, toDisplayString(role.display_name || role.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).role_id]
                          ]),
                          unref(errors).role_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).role_id[0]), 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6" }, [
                      createVNode("h3", { class: "text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700" }, " Foto Profil "),
                      createVNode("div", { class: "flex flex-col items-center gap-4" }, [
                        createVNode("div", { class: "relative group" }, [
                          createVNode("img", {
                            src: unref(previewUrl) || "https://ui-avatars.com/api/?name=" + unref(form).full_name + "&background=0D8ABC&color=fff",
                            class: "w-32 h-32 rounded-full border-4 border-slate-50 dark:border-slate-700 shadow-md object-cover"
                          }, null, 8, ["src"]),
                          createVNode("label", { class: "absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg cursor-pointer transition-transform group-hover:scale-110" }, [
                            createVNode(_component_Icon, {
                              name: "ph:camera-bold",
                              size: "16"
                            }),
                            createVNode("input", {
                              type: "file",
                              onChange: handleFileUpload,
                              class: "hidden",
                              accept: "image/*"
                            }, null, 32)
                          ])
                        ]),
                        createVNode("p", { class: "text-[10px] text-slate-400 text-center" }, "Format: JPG, PNG, Max 2MB")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-span-12 lg:col-span-8" }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 p-6" }, [
                      createVNode("h3", { class: "text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b dark:border-slate-700" }, " Data Personal "),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "NIK (16 Digit)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).nik = $event,
                            type: "text",
                            placeholder: "32xxxxxxxxxxxxxx",
                            class: "form-input-custom",
                            required: "",
                            maxlength: "16"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).nik]
                          ]),
                          unref(errors).nik ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).nik[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Nama Lengkap"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).full_name = $event,
                            type: "text",
                            placeholder: "Nama Lengkap",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).full_name]
                          ]),
                          unref(errors).full_name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).full_name[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Jenis Kelamin"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).gender = $event,
                            class: "form-input-custom",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih Jenis Kelamin"),
                            createVNode("option", { value: "L" }, "Laki-laki"),
                            createVNode("option", { value: "P" }, "Perempuan")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).gender]
                          ]),
                          unref(errors).gender ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).gender[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Nomor HP"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).no_hp = $event,
                            type: "text",
                            placeholder: "08xxxxxxxxxx",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).no_hp]
                          ]),
                          unref(errors).no_hp ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).no_hp[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Tempat Lahir"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).tempat_lahir = $event,
                            type: "text",
                            placeholder: "Kota Lahir",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).tempat_lahir]
                          ]),
                          unref(errors).tempat_lahir ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).tempat_lahir[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Tanggal Lahir"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).tanggal_lahir = $event,
                            type: "date",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).tanggal_lahir]
                          ]),
                          unref(errors).tanggal_lahir ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).tanggal_lahir[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "col-span-1 md:col-span-2 flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Alamat Jalan"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                            rows: "2",
                            placeholder: "Jl. Contoh No. 123",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).alamat]
                          ]),
                          unref(errors).alamat ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).alamat[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "RT"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).rt = $event,
                            type: "text",
                            placeholder: "001",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).rt]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "RW"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).rw = $event,
                            type: "text",
                            placeholder: "001",
                            class: "form-input-custom",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).rw]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Provinsi"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).provinsi_id = $event,
                            onChange: onProvinsiChange,
                            class: "form-input-custom",
                            required: ""
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
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kota / Kabupaten"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).kota_id = $event,
                            disabled: !unref(form).provinsi_id,
                            onChange: onKotaChange,
                            class: "form-input-custom",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih Kota"),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(kotas), (item) => {
                              return openBlock(), createBlock("option", {
                                key: item.id,
                                value: item.id
                              }, toDisplayString(item.nama_kota), 9, ["value"]);
                            }), 128))
                          ], 40, ["onUpdate:modelValue", "disabled"]), [
                            [vModelSelect, unref(form).kota_id]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kecamatan"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).kecamatan_id = $event,
                            disabled: !unref(form).kota_id,
                            onChange: onKecamatanChange,
                            class: "form-input-custom",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih Kecamatan"),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(kecamatans), (item) => {
                              return openBlock(), createBlock("option", {
                                key: item.id,
                                value: item.id
                              }, toDisplayString(item.nama_kecamatan), 9, ["value"]);
                            }), 128))
                          ], 40, ["onUpdate:modelValue", "disabled"]), [
                            [vModelSelect, unref(form).kecamatan_id]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kelurahan / Desa"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).kelurahan_id = $event,
                            disabled: !unref(form).kecamatan_id,
                            class: "form-input-custom",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih Kelurahan"),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(kelurahans), (item) => {
                              return openBlock(), createBlock("option", {
                                key: item.id,
                                value: item.id
                              }, toDisplayString(item.nama_kelurahan), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue", "disabled"]), [
                            [vModelSelect, unref(form).kelurahan_id]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 pt-6 border-t dark:border-slate-700 flex justify-end gap-3" }, [
                        createVNode(_component_NuxtLink, {
                          to: "/admin/users",
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
                        }, toDisplayString(unref(submitting) ? "Menyimpan..." : "Update User"), 9, ["disabled"])
                      ])
                    ])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-94c926b7"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BHXk8RKT.mjs.map
