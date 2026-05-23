import { _ as _export_sfc, b as useRouter, c as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BGJgSZtr.mjs';
import __nuxt_component_0$2 from './index-ZpQ2fISz.mjs';
import { ref, reactive, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, withDirectives, vModelText, createCommentVNode, vModelSelect, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const { fetchapi } = useApi();
    const { showAlert } = useAlert();
    const { fetchKota, fetchKecamatan, fetchKelurahan } = useWilayah();
    const step = ref(1);
    const stepLabels = ["Data Sekolah", "Data PIC", "Selesai"];
    const submitting = ref(false);
    const errors = ref({});
    const provinsis = ref([]);
    const kotas = ref([]);
    const kecamatans = ref([]);
    const kelurahans = ref([]);
    const pic_kotas = ref([]);
    const pic_kecamatans = ref([]);
    const pic_kelurahans = ref([]);
    const previewLogo = ref(null);
    const previewFotoPic = ref(null);
    const form = reactive({
      // Sekolah
      npsn: "",
      nama_sekolah: "",
      alamat_sekolah: "",
      rt: "",
      rw: "",
      tlp_sekolah: "",
      email_sekolah: "",
      provinsi_id: "",
      kota_id: "",
      kecamatan_id: "",
      kelurahan_id: "",
      jenjang: "",
      jenis_sekolah: "",
      logo_sekolah: null,
      // PIC User
      pic_username: "",
      pic_email: "",
      pic_password: "",
      pic_role_id: 2,
      // PIC Role
      // PIC Person
      pic_nik: "",
      pic_full_name: "",
      pic_gender: "",
      pic_no_hp: "",
      pic_tempat_lahir: "",
      pic_tanggal_lahir: "",
      pic_alamat: "",
      pic_rt: "",
      pic_rw: "",
      pic_provinsi_id: "",
      pic_kota_id: "",
      pic_kecamatan_id: "",
      pic_kelurahan_id: "",
      pic_foto: null
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
    const onPicProvinsiChange = async () => {
      form.pic_kota_id = "";
      form.pic_kecamatan_id = "";
      form.pic_kelurahan_id = "";
      pic_kotas.value = await fetchKota(form.pic_provinsi_id);
    };
    const onPicKotaChange = async () => {
      form.pic_kecamatan_id = "";
      form.pic_kelurahan_id = "";
      pic_kecamatans.value = await fetchKecamatan(form.pic_kota_id);
    };
    const onPicKecamatanChange = async () => {
      form.pic_kelurahan_id = "";
      pic_kelurahans.value = await fetchKelurahan(form.pic_kecamatan_id);
    };
    const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        form.logo_sekolah = file;
        previewLogo.value = URL.createObjectURL(file);
      }
    };
    const handleFotoPicUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        form.pic_foto = file;
        previewFotoPic.value = URL.createObjectURL(file);
      }
    };
    const validateStep = (currentStep) => {
      errors.value = {};
      let isValid = true;
      if (currentStep === 1) {
        const fields = [
          { key: "npsn", label: "NPSN" },
          { key: "nama_sekolah", label: "Nama Sekolah" },
          { key: "jenjang", label: "Jenjang" },
          { key: "jenis_sekolah", label: "Jenis Sekolah" },
          { key: "alamat_sekolah", label: "Alamat Sekolah" },
          { key: "rt", label: "RT" },
          { key: "rw", label: "RW" },
          { key: "tlp_sekolah", label: "Telepon Sekolah" },
          { key: "email_sekolah", label: "Email Sekolah" },
          { key: "provinsi_id", label: "Provinsi" },
          { key: "kota_id", label: "Kota" },
          { key: "kecamatan_id", label: "Kecamatan" },
          { key: "kelurahan_id", label: "Kelurahan" }
        ];
        fields.forEach((f) => {
          if (!form[f.key]) {
            errors.value[f.key] = [`${f.label} wajib diisi`];
            isValid = false;
          }
        });
      } else if (currentStep === 2) {
        const fields = [
          { key: "pic_username", label: "Username" },
          { key: "pic_email", label: "Email" },
          { key: "pic_password", label: "Password" },
          { key: "pic_nik", label: "NIK" },
          { key: "pic_full_name", label: "Nama Lengkap" },
          { key: "pic_gender", label: "Jenis Kelamin" },
          { key: "pic_no_hp", label: "Nomor HP" },
          { key: "pic_tempat_lahir", label: "Tempat Lahir" },
          { key: "pic_tanggal_lahir", label: "Tanggal Lahir" },
          { key: "pic_alamat", label: "Alamat" },
          { key: "pic_rt", label: "RT" },
          { key: "pic_rw", label: "RW" },
          { key: "pic_provinsi_id", label: "Provinsi PIC" },
          { key: "pic_kota_id", label: "Kota PIC" },
          { key: "pic_kecamatan_id", label: "Kecamatan PIC" },
          { key: "pic_kelurahan_id", label: "Kelurahan PIC" }
        ];
        fields.forEach((f) => {
          if (!form[f.key]) {
            errors.value[f.key] = [`${f.label} wajib diisi`];
            isValid = false;
          }
        });
      }
      return isValid;
    };
    const nextStep = () => {
      if (validateStep(step.value)) {
        if (step.value < 3) step.value++;
      }
    };
    const prevStep = () => {
      if (step.value > 1) step.value--;
    };
    const submitForm = async () => {
      submitting.value = true;
      errors.value = {};
      try {
        const formData = new FormData();
        for (const key in form) {
          if (form[key] !== null && form[key] !== "") {
            formData.append(key, form[key]);
          }
        }
        const token = useCookie("access_token");
        await fetchapi("/admin/sekolah", {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token.value}`
          }
        });
        showAlert({
          title: "Berhasil!",
          text: "Sekolah dan PIC telah didaftarkan.",
          icon: "success",
          timer: 1500
        });
        router.push("/admin/sekolah");
      } catch (error) {
        if (error.status === 422) {
          errors.value = error.data?.errors || {};
          step.value = 1;
          showAlert({
            title: "Validasi Gagal!",
            text: "Mohon periksa kembali inputan Anda.",
            icon: "error"
          });
        } else {
          showAlert({
            title: "Gagal!",
            text: error.data?.message || "Terjadi kesalahan saat mendaftarkan sekolah.",
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
            _push2(`<div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" data-v-1041ea2c${_scopeId}><h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize" data-v-1041ea2c${_scopeId}>Tambah Sekolah</h1><nav class="flex items-center space-x-2 text-sm" data-v-1041ea2c${_scopeId}>`);
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
              to: "/admin/sekolah",
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
            _push2(`<span class="text-slate-500 dark:text-slate-400" data-v-1041ea2c${_scopeId}>Tambah</span></nav></div><div class="p-6" data-v-1041ea2c${_scopeId}><div class="max-w-4xl mx-auto mb-8" data-v-1041ea2c${_scopeId}><div class="flex items-center justify-between relative" data-v-1041ea2c${_scopeId}><div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 z-0" data-v-1041ea2c${_scopeId}></div><div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 z-0" style="${ssrRenderStyle({ width: (unref(step) - 1) / 2 * 100 + "%" })}" data-v-1041ea2c${_scopeId}></div><!--[-->`);
            ssrRenderList(3, (s) => {
              _push2(`<div class="relative z-10" data-v-1041ea2c${_scopeId}><div class="${ssrRenderClass([[
                unref(step) >= s ? "bg-blue-600 border-blue-100 dark:border-blue-900/30 text-white" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
              ], "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4"])}" data-v-1041ea2c${_scopeId}>`);
              if (unref(step) > s) {
                _push2(ssrRenderComponent(_component_Icon, { name: "ph:check-bold" }, null, _parent2, _scopeId));
              } else {
                _push2(`<span data-v-1041ea2c${_scopeId}>${ssrInterpolate(s)}</span>`);
              }
              _push2(`</div><div class="${ssrRenderClass([unref(step) >= s ? "text-blue-600" : "text-slate-400", "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"])}" data-v-1041ea2c${_scopeId}>${ssrInterpolate(stepLabels[s - 1])}</div></div>`);
            });
            _push2(`<!--]--></div></div><div class="max-w-4xl mx-auto" data-v-1041ea2c${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700 overflow-hidden" data-v-1041ea2c${_scopeId}><div class="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" style="${ssrRenderStyle(unref(step) === 1 ? null : { display: "none" })}" data-v-1041ea2c${_scopeId}><h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4" data-v-1041ea2c${_scopeId}>Informasi Dasar Sekolah</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-1041ea2c${_scopeId}><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>NPSN</label><input${ssrRenderAttr("value", unref(form).npsn)} type="text" placeholder="Masukkan NPSN" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).npsn }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).npsn) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).npsn[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Nama Sekolah</label><input${ssrRenderAttr("value", unref(form).nama_sekolah)} type="text" placeholder="Nama Sekolah" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).nama_sekolah }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).nama_sekolah) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).nama_sekolah[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Jenjang</label><select class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).jenjang }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "") : ssrLooseEqual(unref(form).jenjang, "")) ? " selected" : ""}${_scopeId}>Pilih Jenjang</option><option value="sd" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "sd") : ssrLooseEqual(unref(form).jenjang, "sd")) ? " selected" : ""}${_scopeId}>SD</option><option value="mi" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "mi") : ssrLooseEqual(unref(form).jenjang, "mi")) ? " selected" : ""}${_scopeId}>MI</option><option value="smp" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "smp") : ssrLooseEqual(unref(form).jenjang, "smp")) ? " selected" : ""}${_scopeId}>SMP</option><option value="mts" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "mts") : ssrLooseEqual(unref(form).jenjang, "mts")) ? " selected" : ""}${_scopeId}>MTS</option><option value="sma" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "sma") : ssrLooseEqual(unref(form).jenjang, "sma")) ? " selected" : ""}${_scopeId}>SMA</option><option value="ma" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "ma") : ssrLooseEqual(unref(form).jenjang, "ma")) ? " selected" : ""}${_scopeId}>MA</option><option value="smk" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "smk") : ssrLooseEqual(unref(form).jenjang, "smk")) ? " selected" : ""}${_scopeId}>SMK</option><option value="mak" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenjang) ? ssrLooseContain(unref(form).jenjang, "mak") : ssrLooseEqual(unref(form).jenjang, "mak")) ? " selected" : ""}${_scopeId}>MAK</option></select>`);
            if (unref(errors).jenjang) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).jenjang[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Jenis Sekolah</label><select class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).jenis_sekolah }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_sekolah) ? ssrLooseContain(unref(form).jenis_sekolah, "") : ssrLooseEqual(unref(form).jenis_sekolah, "")) ? " selected" : ""}${_scopeId}>Pilih Jenis</option><option value="negeri" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_sekolah) ? ssrLooseContain(unref(form).jenis_sekolah, "negeri") : ssrLooseEqual(unref(form).jenis_sekolah, "negeri")) ? " selected" : ""}${_scopeId}>Negeri</option><option value="swasta" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_sekolah) ? ssrLooseContain(unref(form).jenis_sekolah, "swasta") : ssrLooseEqual(unref(form).jenis_sekolah, "swasta")) ? " selected" : ""}${_scopeId}>Swasta</option></select>`);
            if (unref(errors).jenis_sekolah) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).jenis_sekolah[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-span-full flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Alamat Lengkap</label><textarea rows="2" placeholder="Jl. Contoh No. 123" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).alamat_sekolah }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).alamat_sekolah)}</textarea>`);
            if (unref(errors).alamat_sekolah) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).alamat_sekolah[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>RT</label><input${ssrRenderAttr("value", unref(form).rt)} type="text" placeholder="001" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).rt }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).rt) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).rt[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>RW</label><input${ssrRenderAttr("value", unref(form).rw)} type="text" placeholder="001" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).rw }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).rw) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).rw[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Telepon Sekolah</label><input${ssrRenderAttr("value", unref(form).tlp_sekolah)} type="text" placeholder="021xxxxxxxx" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).tlp_sekolah }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).tlp_sekolah) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).tlp_sekolah[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Email Sekolah</label><input${ssrRenderAttr("value", unref(form).email_sekolah)} type="email" placeholder="kontak@sekolah.sch.id" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).email_sekolah }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).email_sekolah) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).email_sekolah[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Provinsi</label><select class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).provinsi_id }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).provinsi_id) ? ssrLooseContain(unref(form).provinsi_id, "") : ssrLooseEqual(unref(form).provinsi_id, "")) ? " selected" : ""}${_scopeId}>Pilih Provinsi</option><!--[-->`);
            ssrRenderList(unref(provinsis), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)} data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).provinsi_id) ? ssrLooseContain(unref(form).provinsi_id, item.id) : ssrLooseEqual(unref(form).provinsi_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_provinsi)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(errors).provinsi_id) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).provinsi_id[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Kota / Kabupaten</label><select${ssrIncludeBooleanAttr(!unref(form).provinsi_id) ? " disabled" : ""} class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).kota_id }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).kota_id) ? ssrLooseContain(unref(form).kota_id, "") : ssrLooseEqual(unref(form).kota_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kota</option><!--[-->`);
            ssrRenderList(unref(kotas), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)} data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).kota_id) ? ssrLooseContain(unref(form).kota_id, item.id) : ssrLooseEqual(unref(form).kota_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kota)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(errors).kota_id) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).kota_id[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Kecamatan</label><select${ssrIncludeBooleanAttr(!unref(form).kota_id) ? " disabled" : ""} class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).kecamatan_id }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).kecamatan_id) ? ssrLooseContain(unref(form).kecamatan_id, "") : ssrLooseEqual(unref(form).kecamatan_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kecamatan</option><!--[-->`);
            ssrRenderList(unref(kecamatans), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)} data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).kecamatan_id) ? ssrLooseContain(unref(form).kecamatan_id, item.id) : ssrLooseEqual(unref(form).kecamatan_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kecamatan)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(errors).kecamatan_id) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).kecamatan_id[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Kelurahan / Desa</label><select${ssrIncludeBooleanAttr(!unref(form).kecamatan_id) ? " disabled" : ""} class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).kelurahan_id }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).kelurahan_id) ? ssrLooseContain(unref(form).kelurahan_id, "") : ssrLooseEqual(unref(form).kelurahan_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kelurahan</option><!--[-->`);
            ssrRenderList(unref(kelurahans), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)} data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).kelurahan_id) ? ssrLooseContain(unref(form).kelurahan_id, item.id) : ssrLooseEqual(unref(form).kelurahan_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kelurahan)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(errors).kelurahan_id) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).kelurahan_id[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Logo Sekolah</label><div class="flex items-center gap-4" data-v-1041ea2c${_scopeId}>`);
            if (unref(previewLogo)) {
              _push2(`<img${ssrRenderAttr("src", unref(previewLogo))} class="w-12 h-12 rounded object-cover border" data-v-1041ea2c${_scopeId}>`);
            } else {
              _push2(`<div class="w-12 h-12 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-dashed" data-v-1041ea2c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:image-square-bold",
                class: "text-slate-400"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`<input type="file" accept="image/*" class="text-xs text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" data-v-1041ea2c${_scopeId}></div></div></div></div><div class="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" style="${ssrRenderStyle(unref(step) === 2 ? null : { display: "none" })}" data-v-1041ea2c${_scopeId}><h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4" data-v-1041ea2c${_scopeId}>Informasi Akun PIC</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-1041ea2c${_scopeId}><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Username</label><input${ssrRenderAttr("value", unref(form).pic_username)} type="text" placeholder="username" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_username }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_username) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_username[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Email</label><input${ssrRenderAttr("value", unref(form).pic_email)} type="email" placeholder="pic@example.com" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_email }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_email) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_email[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Password</label><input${ssrRenderAttr("value", unref(form).pic_password)} type="password" placeholder="********" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_password }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_password) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_password[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>NIK (16 Digit)</label><input${ssrRenderAttr("value", unref(form).pic_nik)} type="text" placeholder="32xxxxxxxxxxxxxx" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_nik }, "form-input-custom"])}" required maxlength="16" data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_nik) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_nik[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Nama Lengkap</label><input${ssrRenderAttr("value", unref(form).pic_full_name)} type="text" placeholder="Nama Lengkap" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_full_name }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_full_name) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_full_name[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Jenis Kelamin</label><select class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_gender }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_gender) ? ssrLooseContain(unref(form).pic_gender, "") : ssrLooseEqual(unref(form).pic_gender, "")) ? " selected" : ""}${_scopeId}>Pilih</option><option value="L" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_gender) ? ssrLooseContain(unref(form).pic_gender, "L") : ssrLooseEqual(unref(form).pic_gender, "L")) ? " selected" : ""}${_scopeId}>Laki-laki</option><option value="P" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_gender) ? ssrLooseContain(unref(form).pic_gender, "P") : ssrLooseEqual(unref(form).pic_gender, "P")) ? " selected" : ""}${_scopeId}>Perempuan</option></select>`);
            if (unref(errors).pic_gender) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_gender[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Nomor HP</label><input${ssrRenderAttr("value", unref(form).pic_no_hp)} type="text" placeholder="08xxxxxxxxxx" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_no_hp }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_no_hp) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_no_hp[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Tempat Lahir</label><input${ssrRenderAttr("value", unref(form).pic_tempat_lahir)} type="text" placeholder="Kota Lahir" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_tempat_lahir }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_tempat_lahir) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_tempat_lahir[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Tanggal Lahir</label><input${ssrRenderAttr("value", unref(form).pic_tanggal_lahir)} type="date" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_tanggal_lahir }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_tanggal_lahir) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_tanggal_lahir[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Foto PIC</label><div class="flex items-center gap-4" data-v-1041ea2c${_scopeId}>`);
            if (unref(previewFotoPic)) {
              _push2(`<img${ssrRenderAttr("src", unref(previewFotoPic))} class="w-10 h-10 rounded-full object-cover border" data-v-1041ea2c${_scopeId}>`);
            } else {
              _push2(`<div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-dashed" data-v-1041ea2c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "ph:user-bold",
                class: "text-slate-400"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`<input type="file" accept="image/*" class="text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" data-v-1041ea2c${_scopeId}></div></div><div class="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t dark:border-slate-700" data-v-1041ea2c${_scopeId}><div class="col-span-full flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Alamat PIC (Jalan)</label><textarea rows="2" placeholder="Jl. Contoh No. 123" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_alamat }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).pic_alamat)}</textarea>`);
            if (unref(errors).pic_alamat) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_alamat[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>RT</label><input${ssrRenderAttr("value", unref(form).pic_rt)} type="text" placeholder="001" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_rt }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_rt) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_rt[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>RW</label><input${ssrRenderAttr("value", unref(form).pic_rw)} type="text" placeholder="001" class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_rw }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}>`);
            if (unref(errors).pic_rw) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_rw[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Provinsi</label><select class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_provinsi_id }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_provinsi_id) ? ssrLooseContain(unref(form).pic_provinsi_id, "") : ssrLooseEqual(unref(form).pic_provinsi_id, "")) ? " selected" : ""}${_scopeId}>Pilih Provinsi</option><!--[-->`);
            ssrRenderList(unref(provinsis), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)} data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_provinsi_id) ? ssrLooseContain(unref(form).pic_provinsi_id, item.id) : ssrLooseEqual(unref(form).pic_provinsi_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_provinsi)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(errors).pic_provinsi_id) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_provinsi_id[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Kota / Kabupaten</label><select${ssrIncludeBooleanAttr(!unref(form).pic_provinsi_id) ? " disabled" : ""} class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_kota_id }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_kota_id) ? ssrLooseContain(unref(form).pic_kota_id, "") : ssrLooseEqual(unref(form).pic_kota_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kota</option><!--[-->`);
            ssrRenderList(unref(pic_kotas), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)} data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_kota_id) ? ssrLooseContain(unref(form).pic_kota_id, item.id) : ssrLooseEqual(unref(form).pic_kota_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kota)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(errors).pic_kota_id) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_kota_id[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Kecamatan</label><select${ssrIncludeBooleanAttr(!unref(form).pic_kota_id) ? " disabled" : ""} class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_kecamatan_id }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_kecamatan_id) ? ssrLooseContain(unref(form).pic_kecamatan_id, "") : ssrLooseEqual(unref(form).pic_kecamatan_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kecamatan</option><!--[-->`);
            ssrRenderList(unref(pic_kecamatans), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)} data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_kecamatan_id) ? ssrLooseContain(unref(form).pic_kecamatan_id, item.id) : ssrLooseEqual(unref(form).pic_kecamatan_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kecamatan)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(errors).pic_kecamatan_id) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_kecamatan_id[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col gap-1.5" data-v-1041ea2c${_scopeId}><label class="text-xs font-bold text-slate-500 uppercase" data-v-1041ea2c${_scopeId}>Kelurahan / Desa</label><select${ssrIncludeBooleanAttr(!unref(form).pic_kecamatan_id) ? " disabled" : ""} class="${ssrRenderClass([{ "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_kelurahan_id }, "form-input-custom"])}" required data-v-1041ea2c${_scopeId}><option value="" data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_kelurahan_id) ? ssrLooseContain(unref(form).pic_kelurahan_id, "") : ssrLooseEqual(unref(form).pic_kelurahan_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kelurahan</option><!--[-->`);
            ssrRenderList(unref(pic_kelurahans), (item) => {
              _push2(`<option${ssrRenderAttr("value", item.id)} data-v-1041ea2c${ssrIncludeBooleanAttr(Array.isArray(unref(form).pic_kelurahan_id) ? ssrLooseContain(unref(form).pic_kelurahan_id, item.id) : ssrLooseEqual(unref(form).pic_kelurahan_id, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.nama_kelurahan)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(errors).pic_kelurahan_id) {
              _push2(`<p class="text-[10px] text-rose-500 mt-1" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(errors).pic_kelurahan_id[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300" style="${ssrRenderStyle(unref(step) === 3 ? null : { display: "none" })}" data-v-1041ea2c${_scopeId}><div data-v-1041ea2c${_scopeId}><h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4 mb-4" data-v-1041ea2c${_scopeId}>Review Pendaftaran</h3><p class="text-sm text-slate-500" data-v-1041ea2c${_scopeId}>Pastikan semua data di bawah ini sudah benar sebelum menyimpan.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-1041ea2c${_scopeId}><div class="space-y-4" data-v-1041ea2c${_scopeId}><div class="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider" data-v-1041ea2c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:school-bold",
              size: "20"
            }, null, _parent2, _scopeId));
            _push2(` Data Sekolah </div><div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3" data-v-1041ea2c${_scopeId}><div class="flex justify-between border-b dark:border-slate-800 pb-2" data-v-1041ea2c${_scopeId}><span class="text-xs text-slate-500 font-bold" data-v-1041ea2c${_scopeId}>NPSN</span><span class="text-sm font-medium" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).npsn)}</span></div><div class="flex justify-between border-b dark:border-slate-800 pb-2" data-v-1041ea2c${_scopeId}><span class="text-xs text-slate-500 font-bold" data-v-1041ea2c${_scopeId}>Nama</span><span class="text-sm font-medium" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).nama_sekolah)}</span></div><div class="flex justify-between border-b dark:border-slate-800 pb-2" data-v-1041ea2c${_scopeId}><span class="text-xs text-slate-500 font-bold" data-v-1041ea2c${_scopeId}>Jenjang</span><span class="text-sm font-medium uppercase" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).jenjang)} (${ssrInterpolate(unref(form).jenis_sekolah)})</span></div><div class="flex justify-between border-b dark:border-slate-800 pb-2" data-v-1041ea2c${_scopeId}><span class="text-xs text-slate-500 font-bold" data-v-1041ea2c${_scopeId}>Kontak</span><span class="text-sm font-medium" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).tlp_sekolah)} / ${ssrInterpolate(unref(form).email_sekolah)}</span></div><div class="flex justify-between border-b dark:border-slate-800 pb-2" data-v-1041ea2c${_scopeId}><span class="text-xs text-slate-500 font-bold" data-v-1041ea2c${_scopeId}>Alamat</span><span class="text-sm font-medium" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).alamat_sekolah)} RT ${ssrInterpolate(unref(form).rt)} RW ${ssrInterpolate(unref(form).rw)}</span></div></div></div><div class="space-y-4" data-v-1041ea2c${_scopeId}><div class="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider" data-v-1041ea2c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:user-circle-gear-bold",
              size: "20"
            }, null, _parent2, _scopeId));
            _push2(` Data PIC </div><div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3" data-v-1041ea2c${_scopeId}><div class="flex justify-between border-b dark:border-slate-800 pb-2" data-v-1041ea2c${_scopeId}><span class="text-xs text-slate-500 font-bold" data-v-1041ea2c${_scopeId}>Username</span><span class="text-sm font-medium" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).pic_username)}</span></div><div class="flex justify-between border-b dark:border-slate-800 pb-2" data-v-1041ea2c${_scopeId}><span class="text-xs text-slate-500 font-bold" data-v-1041ea2c${_scopeId}>Nama Lengkap</span><span class="text-sm font-medium" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).pic_full_name)}</span></div><div class="flex justify-between border-b dark:border-slate-800 pb-2" data-v-1041ea2c${_scopeId}><span class="text-xs text-slate-500 font-bold" data-v-1041ea2c${_scopeId}>Email</span><span class="text-sm font-medium" data-v-1041ea2c${_scopeId}>${ssrInterpolate(unref(form).pic_email)}</span></div></div></div></div><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3" data-v-1041ea2c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "ph:info-bold",
              class: "text-blue-600 flex-shrink-0",
              size: "20"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-blue-800 dark:text-blue-300 leading-relaxed" data-v-1041ea2c${_scopeId}> Menyimpan data ini akan otomatis membuat akun user dengan role <strong data-v-1041ea2c${_scopeId}>PIC</strong> dan menghubungkannya dengan sekolah yang didaftarkan. </p></div></div><div class="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-between items-center" data-v-1041ea2c${_scopeId}><button type="button" class="px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2" style="${ssrRenderStyle(unref(step) > 1 ? null : { display: "none" })}" data-v-1041ea2c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, { name: "ph:arrow-left-bold" }, null, _parent2, _scopeId));
            _push2(` Sebelumnya </button><div style="${ssrRenderStyle(unref(step) === 1 ? null : { display: "none" })}" data-v-1041ea2c${_scopeId}></div><div class="flex gap-3" data-v-1041ea2c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/sekolah",
              class: "px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all"
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
            if (unref(step) < 3) {
              _push2(`<button type="button" class="bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2" data-v-1041ea2c${_scopeId}> Selanjutnya `);
              _push2(ssrRenderComponent(_component_Icon, { name: "ph:arrow-right-bold" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(`<button type="button"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="bg-blue-600 text-white px-10 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2" data-v-1041ea2c${_scopeId}>`);
              if (unref(submitting)) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "ph:circle-notch-bold",
                  class: "animate-spin"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(` Daftarkan Sekarang </button>`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700" }, [
                createVNode("h1", { class: "text-lg font-semibold text-slate-800 dark:text-white capitalize" }, "Tambah Sekolah"),
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
                    to: "/admin/sekolah",
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
                  createVNode("span", { class: "text-slate-500 dark:text-slate-400" }, "Tambah")
                ])
              ]),
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto mb-8" }, [
                  createVNode("div", { class: "flex items-center justify-between relative" }, [
                    createVNode("div", { class: "absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 z-0" }),
                    createVNode("div", {
                      class: "absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 z-0",
                      style: { width: (unref(step) - 1) / 2 * 100 + "%" }
                    }, null, 4),
                    (openBlock(), createBlock(Fragment, null, renderList(3, (s) => {
                      return createVNode("div", {
                        key: s,
                        class: "relative z-10"
                      }, [
                        createVNode("div", {
                          class: ["w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4", [
                            unref(step) >= s ? "bg-blue-600 border-blue-100 dark:border-blue-900/30 text-white" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                          ]]
                        }, [
                          unref(step) > s ? (openBlock(), createBlock(_component_Icon, {
                            key: 0,
                            name: "ph:check-bold"
                          })) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(s), 1))
                        ], 2),
                        createVNode("div", {
                          class: ["absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap", unref(step) >= s ? "text-blue-600" : "text-slate-400"]
                        }, toDisplayString(stepLabels[s - 1]), 3)
                      ]);
                    }), 64))
                  ])
                ]),
                createVNode("div", { class: "max-w-4xl mx-auto" }, [
                  createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700 overflow-hidden" }, [
                    withDirectives(createVNode("div", { class: "p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" }, [
                      createVNode("h3", { class: "text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4" }, "Informasi Dasar Sekolah"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "NPSN"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).npsn = $event,
                            type: "text",
                            placeholder: "Masukkan NPSN",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).npsn }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).npsn]
                          ]),
                          unref(errors).npsn ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).npsn[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Nama Sekolah"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).nama_sekolah = $event,
                            type: "text",
                            placeholder: "Nama Sekolah",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).nama_sekolah }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).nama_sekolah]
                          ]),
                          unref(errors).nama_sekolah ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).nama_sekolah[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Jenjang"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).jenjang = $event,
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).jenjang }],
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih Jenjang"),
                            createVNode("option", { value: "sd" }, "SD"),
                            createVNode("option", { value: "mi" }, "MI"),
                            createVNode("option", { value: "smp" }, "SMP"),
                            createVNode("option", { value: "mts" }, "MTS"),
                            createVNode("option", { value: "sma" }, "SMA"),
                            createVNode("option", { value: "ma" }, "MA"),
                            createVNode("option", { value: "smk" }, "SMK"),
                            createVNode("option", { value: "mak" }, "MAK")
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).jenjang]
                          ]),
                          unref(errors).jenjang ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).jenjang[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Jenis Sekolah"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).jenis_sekolah = $event,
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).jenis_sekolah }],
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih Jenis"),
                            createVNode("option", { value: "negeri" }, "Negeri"),
                            createVNode("option", { value: "swasta" }, "Swasta")
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).jenis_sekolah]
                          ]),
                          unref(errors).jenis_sekolah ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).jenis_sekolah[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "col-span-full flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Alamat Lengkap"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).alamat_sekolah = $event,
                            rows: "2",
                            placeholder: "Jl. Contoh No. 123",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).alamat_sekolah }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).alamat_sekolah]
                          ]),
                          unref(errors).alamat_sekolah ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).alamat_sekolah[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "RT"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).rt = $event,
                            type: "text",
                            placeholder: "001",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).rt }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).rt]
                          ]),
                          unref(errors).rt ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).rt[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "RW"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).rw = $event,
                            type: "text",
                            placeholder: "001",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).rw }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).rw]
                          ]),
                          unref(errors).rw ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).rw[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Telepon Sekolah"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).tlp_sekolah = $event,
                            type: "text",
                            placeholder: "021xxxxxxxx",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).tlp_sekolah }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).tlp_sekolah]
                          ]),
                          unref(errors).tlp_sekolah ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).tlp_sekolah[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Email Sekolah"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).email_sekolah = $event,
                            type: "email",
                            placeholder: "kontak@sekolah.sch.id",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).email_sekolah }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email_sekolah]
                          ]),
                          unref(errors).email_sekolah ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).email_sekolah[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Provinsi"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).provinsi_id = $event,
                            onChange: onProvinsiChange,
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).provinsi_id }],
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih Provinsi"),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(provinsis), (item) => {
                              return openBlock(), createBlock("option", {
                                key: item.id,
                                value: item.id
                              }, toDisplayString(item.nama_provinsi), 9, ["value"]);
                            }), 128))
                          ], 42, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).provinsi_id]
                          ]),
                          unref(errors).provinsi_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).provinsi_id[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kota / Kabupaten"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).kota_id = $event,
                            disabled: !unref(form).provinsi_id,
                            onChange: onKotaChange,
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).kota_id }],
                            required: ""
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
                          ]),
                          unref(errors).kota_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).kota_id[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kecamatan"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).kecamatan_id = $event,
                            disabled: !unref(form).kota_id,
                            onChange: onKecamatanChange,
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).kecamatan_id }],
                            required: ""
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
                          ]),
                          unref(errors).kecamatan_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).kecamatan_id[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kelurahan / Desa"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).kelurahan_id = $event,
                            disabled: !unref(form).kecamatan_id,
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).kelurahan_id }],
                            required: ""
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
                          ]),
                          unref(errors).kelurahan_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).kelurahan_id[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Logo Sekolah"),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            unref(previewLogo) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(previewLogo),
                              class: "w-12 h-12 rounded object-cover border"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "w-12 h-12 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-dashed"
                            }, [
                              createVNode(_component_Icon, {
                                name: "ph:image-square-bold",
                                class: "text-slate-400"
                              })
                            ])),
                            createVNode("input", {
                              type: "file",
                              onChange: handleLogoUpload,
                              accept: "image/*",
                              class: "text-xs text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            }, null, 32)
                          ])
                        ])
                      ])
                    ], 512), [
                      [vShow, unref(step) === 1]
                    ]),
                    withDirectives(createVNode("div", { class: "p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" }, [
                      createVNode("h3", { class: "text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4" }, "Informasi Akun PIC"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Username"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_username = $event,
                            type: "text",
                            placeholder: "username",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_username }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pic_username]
                          ]),
                          unref(errors).pic_username ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_username[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Email"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_email = $event,
                            type: "email",
                            placeholder: "pic@example.com",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_email }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pic_email]
                          ]),
                          unref(errors).pic_email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_email[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Password"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_password = $event,
                            type: "password",
                            placeholder: "********",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_password }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pic_password]
                          ]),
                          unref(errors).pic_password ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_password[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "NIK (16 Digit)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_nik = $event,
                            type: "text",
                            placeholder: "32xxxxxxxxxxxxxx",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_nik }],
                            required: "",
                            maxlength: "16"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pic_nik]
                          ]),
                          unref(errors).pic_nik ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_nik[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Nama Lengkap"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_full_name = $event,
                            type: "text",
                            placeholder: "Nama Lengkap",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_full_name }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pic_full_name]
                          ]),
                          unref(errors).pic_full_name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_full_name[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Jenis Kelamin"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_gender = $event,
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_gender }],
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Pilih"),
                            createVNode("option", { value: "L" }, "Laki-laki"),
                            createVNode("option", { value: "P" }, "Perempuan")
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).pic_gender]
                          ]),
                          unref(errors).pic_gender ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_gender[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Nomor HP"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_no_hp = $event,
                            type: "text",
                            placeholder: "08xxxxxxxxxx",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_no_hp }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pic_no_hp]
                          ]),
                          unref(errors).pic_no_hp ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_no_hp[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Tempat Lahir"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_tempat_lahir = $event,
                            type: "text",
                            placeholder: "Kota Lahir",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_tempat_lahir }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pic_tempat_lahir]
                          ]),
                          unref(errors).pic_tempat_lahir ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_tempat_lahir[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Tanggal Lahir"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pic_tanggal_lahir = $event,
                            type: "date",
                            class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_tanggal_lahir }],
                            required: ""
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pic_tanggal_lahir]
                          ]),
                          unref(errors).pic_tanggal_lahir ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-[10px] text-rose-500 mt-1"
                          }, toDisplayString(unref(errors).pic_tanggal_lahir[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col gap-1.5" }, [
                          createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Foto PIC"),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            unref(previewFotoPic) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(previewFotoPic),
                              class: "w-10 h-10 rounded-full object-cover border"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-dashed"
                            }, [
                              createVNode(_component_Icon, {
                                name: "ph:user-bold",
                                class: "text-slate-400"
                              })
                            ])),
                            createVNode("input", {
                              type: "file",
                              onChange: handleFotoPicUpload,
                              accept: "image/*",
                              class: "text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            }, null, 32)
                          ])
                        ]),
                        createVNode("div", { class: "col-span-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t dark:border-slate-700" }, [
                          createVNode("div", { class: "col-span-full flex flex-col gap-1.5" }, [
                            createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Alamat PIC (Jalan)"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_alamat = $event,
                              rows: "2",
                              placeholder: "Jl. Contoh No. 123",
                              class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_alamat }],
                              required: ""
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).pic_alamat]
                            ]),
                            unref(errors).pic_alamat ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-[10px] text-rose-500 mt-1"
                            }, toDisplayString(unref(errors).pic_alamat[0]), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex flex-col gap-1.5" }, [
                            createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "RT"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_rt = $event,
                              type: "text",
                              placeholder: "001",
                              class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_rt }],
                              required: ""
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).pic_rt]
                            ]),
                            unref(errors).pic_rt ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-[10px] text-rose-500 mt-1"
                            }, toDisplayString(unref(errors).pic_rt[0]), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex flex-col gap-1.5" }, [
                            createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "RW"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_rw = $event,
                              type: "text",
                              placeholder: "001",
                              class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_rw }],
                              required: ""
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).pic_rw]
                            ]),
                            unref(errors).pic_rw ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-[10px] text-rose-500 mt-1"
                            }, toDisplayString(unref(errors).pic_rw[0]), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex flex-col gap-1.5" }, [
                            createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Provinsi"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_provinsi_id = $event,
                              onChange: onPicProvinsiChange,
                              class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_provinsi_id }],
                              required: ""
                            }, [
                              createVNode("option", { value: "" }, "Pilih Provinsi"),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(provinsis), (item) => {
                                return openBlock(), createBlock("option", {
                                  key: item.id,
                                  value: item.id
                                }, toDisplayString(item.nama_provinsi), 9, ["value"]);
                              }), 128))
                            ], 42, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).pic_provinsi_id]
                            ]),
                            unref(errors).pic_provinsi_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-[10px] text-rose-500 mt-1"
                            }, toDisplayString(unref(errors).pic_provinsi_id[0]), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex flex-col gap-1.5" }, [
                            createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kota / Kabupaten"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_kota_id = $event,
                              disabled: !unref(form).pic_provinsi_id,
                              onChange: onPicKotaChange,
                              class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_kota_id }],
                              required: ""
                            }, [
                              createVNode("option", { value: "" }, "Pilih Kota"),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(pic_kotas), (item) => {
                                return openBlock(), createBlock("option", {
                                  key: item.id,
                                  value: item.id
                                }, toDisplayString(item.nama_kota), 9, ["value"]);
                              }), 128))
                            ], 42, ["onUpdate:modelValue", "disabled"]), [
                              [vModelSelect, unref(form).pic_kota_id]
                            ]),
                            unref(errors).pic_kota_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-[10px] text-rose-500 mt-1"
                            }, toDisplayString(unref(errors).pic_kota_id[0]), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex flex-col gap-1.5" }, [
                            createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kecamatan"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_kecamatan_id = $event,
                              disabled: !unref(form).pic_kota_id,
                              onChange: onPicKecamatanChange,
                              class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_kecamatan_id }],
                              required: ""
                            }, [
                              createVNode("option", { value: "" }, "Pilih Kecamatan"),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(pic_kecamatans), (item) => {
                                return openBlock(), createBlock("option", {
                                  key: item.id,
                                  value: item.id
                                }, toDisplayString(item.nama_kecamatan), 9, ["value"]);
                              }), 128))
                            ], 42, ["onUpdate:modelValue", "disabled"]), [
                              [vModelSelect, unref(form).pic_kecamatan_id]
                            ]),
                            unref(errors).pic_kecamatan_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-[10px] text-rose-500 mt-1"
                            }, toDisplayString(unref(errors).pic_kecamatan_id[0]), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex flex-col gap-1.5" }, [
                            createVNode("label", { class: "text-xs font-bold text-slate-500 uppercase" }, "Kelurahan / Desa"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_kelurahan_id = $event,
                              disabled: !unref(form).pic_kecamatan_id,
                              class: ["form-input-custom", { "border-rose-500 ring-1 ring-rose-500": unref(errors).pic_kelurahan_id }],
                              required: ""
                            }, [
                              createVNode("option", { value: "" }, "Pilih Kelurahan"),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(pic_kelurahans), (item) => {
                                return openBlock(), createBlock("option", {
                                  key: item.id,
                                  value: item.id
                                }, toDisplayString(item.nama_kelurahan), 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue", "disabled"]), [
                              [vModelSelect, unref(form).pic_kelurahan_id]
                            ]),
                            unref(errors).pic_kelurahan_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-[10px] text-rose-500 mt-1"
                            }, toDisplayString(unref(errors).pic_kelurahan_id[0]), 1)) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ], 512), [
                      [vShow, unref(step) === 2]
                    ]),
                    withDirectives(createVNode("div", { class: "p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4 mb-4" }, "Review Pendaftaran"),
                        createVNode("p", { class: "text-sm text-slate-500" }, "Pastikan semua data di bawah ini sudah benar sebelum menyimpan.")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-8" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider" }, [
                            createVNode(_component_Icon, {
                              name: "ph:school-bold",
                              size: "20"
                            }),
                            createTextVNode(" Data Sekolah ")
                          ]),
                          createVNode("div", { class: "bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3" }, [
                            createVNode("div", { class: "flex justify-between border-b dark:border-slate-800 pb-2" }, [
                              createVNode("span", { class: "text-xs text-slate-500 font-bold" }, "NPSN"),
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(form).npsn), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between border-b dark:border-slate-800 pb-2" }, [
                              createVNode("span", { class: "text-xs text-slate-500 font-bold" }, "Nama"),
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(form).nama_sekolah), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between border-b dark:border-slate-800 pb-2" }, [
                              createVNode("span", { class: "text-xs text-slate-500 font-bold" }, "Jenjang"),
                              createVNode("span", { class: "text-sm font-medium uppercase" }, toDisplayString(unref(form).jenjang) + " (" + toDisplayString(unref(form).jenis_sekolah) + ")", 1)
                            ]),
                            createVNode("div", { class: "flex justify-between border-b dark:border-slate-800 pb-2" }, [
                              createVNode("span", { class: "text-xs text-slate-500 font-bold" }, "Kontak"),
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(form).tlp_sekolah) + " / " + toDisplayString(unref(form).email_sekolah), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between border-b dark:border-slate-800 pb-2" }, [
                              createVNode("span", { class: "text-xs text-slate-500 font-bold" }, "Alamat"),
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(form).alamat_sekolah) + " RT " + toDisplayString(unref(form).rt) + " RW " + toDisplayString(unref(form).rw), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider" }, [
                            createVNode(_component_Icon, {
                              name: "ph:user-circle-gear-bold",
                              size: "20"
                            }),
                            createTextVNode(" Data PIC ")
                          ]),
                          createVNode("div", { class: "bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3" }, [
                            createVNode("div", { class: "flex justify-between border-b dark:border-slate-800 pb-2" }, [
                              createVNode("span", { class: "text-xs text-slate-500 font-bold" }, "Username"),
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(form).pic_username), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between border-b dark:border-slate-800 pb-2" }, [
                              createVNode("span", { class: "text-xs text-slate-500 font-bold" }, "Nama Lengkap"),
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(form).pic_full_name), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between border-b dark:border-slate-800 pb-2" }, [
                              createVNode("span", { class: "text-xs text-slate-500 font-bold" }, "Email"),
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(form).pic_email), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3" }, [
                        createVNode(_component_Icon, {
                          name: "ph:info-bold",
                          class: "text-blue-600 flex-shrink-0",
                          size: "20"
                        }),
                        createVNode("p", { class: "text-xs text-blue-800 dark:text-blue-300 leading-relaxed" }, [
                          createTextVNode(" Menyimpan data ini akan otomatis membuat akun user dengan role "),
                          createVNode("strong", null, "PIC"),
                          createTextVNode(" dan menghubungkannya dengan sekolah yang didaftarkan. ")
                        ])
                      ])
                    ], 512), [
                      [vShow, unref(step) === 3]
                    ]),
                    createVNode("div", { class: "p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-between items-center" }, [
                      withDirectives(createVNode("button", {
                        type: "button",
                        onClick: prevStep,
                        class: "px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2"
                      }, [
                        createVNode(_component_Icon, { name: "ph:arrow-left-bold" }),
                        createTextVNode(" Sebelumnya ")
                      ], 512), [
                        [vShow, unref(step) > 1]
                      ]),
                      withDirectives(createVNode("div", null, null, 512), [
                        [vShow, unref(step) === 1]
                      ]),
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode(_component_NuxtLink, {
                          to: "/admin/sekolah",
                          class: "px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }),
                        unref(step) < 3 ? (openBlock(), createBlock("button", {
                          key: 0,
                          type: "button",
                          onClick: nextStep,
                          class: "bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
                        }, [
                          createTextVNode(" Selanjutnya "),
                          createVNode(_component_Icon, { name: "ph:arrow-right-bold" })
                        ])) : (openBlock(), createBlock("button", {
                          key: 1,
                          type: "button",
                          onClick: submitForm,
                          disabled: unref(submitting),
                          class: "bg-blue-600 text-white px-10 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                        }, [
                          unref(submitting) ? (openBlock(), createBlock(_component_Icon, {
                            key: 0,
                            name: "ph:circle-notch-bold",
                            class: "animate-spin"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Daftarkan Sekarang ")
                        ], 8, ["disabled"]))
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/sekolah/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1041ea2c"]]);

export { create as default };
//# sourceMappingURL=create-DCEoPFrj.mjs.map
