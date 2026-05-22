<template>
  <NuxtLayout name="admin">
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">Tambah Sekolah</h1>
      <nav class="flex items-center space-x-2 text-sm">
        <NuxtLink to="/admin" class="text-blue-500 hover:underline">Admin</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <NuxtLink to="/admin/sekolah" class="text-blue-500 hover:underline">Sekolah</NuxtLink>
        <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
        <span class="text-slate-500 dark:text-slate-400">Tambah</span>
      </nav>
    </div>

    <div class="p-6">
      <!-- Wizard Stepper -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="flex items-center justify-between relative">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 z-0"></div>
          <div 
            class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 z-0"
            :style="{ width: ((step - 1) / 2 * 100) + '%' }"
          ></div>

          <div v-for="s in 3" :key="s" class="relative z-10">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4"
              :class="[
                step >= s 
                  ? 'bg-blue-600 border-blue-100 dark:border-blue-900/30 text-white' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              ]"
            >
              <Icon v-if="step > s" name="ph:check-bold" />
              <span v-else>{{ s }}</span>
            </div>
            <div 
              class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
              :class="step >= s ? 'text-blue-600' : 'text-slate-400'"
            >
              {{ stepLabels[s-1] }}
            </div>
          </div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700 overflow-hidden">
          
          <!-- STEP 1: DATA SEKOLAH -->
          <div v-show="step === 1" class="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4">Informasi Dasar Sekolah</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NPSN</label>
                <input v-model="form.npsn" type="text" placeholder="Masukkan NPSN" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.npsn }" required />
                <p v-if="errors.npsn" class="text-[10px] text-rose-500 mt-1">{{ errors.npsn[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nama Sekolah</label>
                <input v-model="form.nama_sekolah" type="text" placeholder="Nama Sekolah" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.nama_sekolah }" required />
                <p v-if="errors.nama_sekolah" class="text-[10px] text-rose-500 mt-1">{{ errors.nama_sekolah[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Jenjang</label>
                <select v-model="form.jenjang" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.jenjang }" required>
                  <option value="">Pilih Jenjang</option>
                  <option value="sd">SD</option>
                  <option value="mi">MI</option>
                  <option value="smp">SMP</option>
                  <option value="mts">MTS</option>
                  <option value="sma">SMA</option>
                  <option value="ma">MA</option>
                  <option value="smk">SMK</option>
                  <option value="mak">MAK</option>
                </select>
                <p v-if="errors.jenjang" class="text-[10px] text-rose-500 mt-1">{{ errors.jenjang[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Jenis Sekolah</label>
                <select v-model="form.jenis_sekolah" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.jenis_sekolah }" required>
                  <option value="">Pilih Jenis</option>
                  <option value="negeri">Negeri</option>
                  <option value="swasta">Swasta</option>
                </select>
                <p v-if="errors.jenis_sekolah" class="text-[10px] text-rose-500 mt-1">{{ errors.jenis_sekolah[0] }}</p>
              </div>

              <div class="col-span-full flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                <textarea v-model="form.alamat_sekolah" rows="2" placeholder="Jl. Contoh No. 123" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.alamat_sekolah }" required></textarea>
                <p v-if="errors.alamat_sekolah" class="text-[10px] text-rose-500 mt-1">{{ errors.alamat_sekolah[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">RT</label>
                <input v-model="form.rt" type="text" placeholder="001" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.rt }" required />
                <p v-if="errors.rt" class="text-[10px] text-rose-500 mt-1">{{ errors.rt[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">RW</label>
                <input v-model="form.rw" type="text" placeholder="001" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.rw }" required />
                <p v-if="errors.rw" class="text-[10px] text-rose-500 mt-1">{{ errors.rw[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Telepon Sekolah</label>
                <input v-model="form.tlp_sekolah" type="text" placeholder="021xxxxxxxx" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.tlp_sekolah }" required />
                <p v-if="errors.tlp_sekolah" class="text-[10px] text-rose-500 mt-1">{{ errors.tlp_sekolah[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Email Sekolah</label>
                <input v-model="form.email_sekolah" type="email" placeholder="kontak@sekolah.sch.id" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.email_sekolah }" required />
                <p v-if="errors.email_sekolah" class="text-[10px] text-rose-500 mt-1">{{ errors.email_sekolah[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Provinsi</label>
                <select v-model="form.provinsi_id" @change="onProvinsiChange" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.provinsi_id }" required>
                  <option value="">Pilih Provinsi</option>
                  <option v-for="item in provinsis" :key="item.id" :value="item.id">{{ item.nama_provinsi }}</option>
                </select>
                <p v-if="errors.provinsi_id" class="text-[10px] text-rose-500 mt-1">{{ errors.provinsi_id[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Kota / Kabupaten</label>
                <select v-model="form.kota_id" :disabled="!form.provinsi_id" @change="onKotaChange" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.kota_id }" required>
                  <option value="">Pilih Kota</option>
                  <option v-for="item in kotas" :key="item.id" :value="item.id">{{ item.nama_kota }}</option>
                </select>
                <p v-if="errors.kota_id" class="text-[10px] text-rose-500 mt-1">{{ errors.kota_id[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Kecamatan</label>
                <select v-model="form.kecamatan_id" :disabled="!form.kota_id" @change="onKecamatanChange" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.kecamatan_id }" required>
                  <option value="">Pilih Kecamatan</option>
                  <option v-for="item in kecamatans" :key="item.id" :value="item.id">{{ item.nama_kecamatan }}</option>
                </select>
                <p v-if="errors.kecamatan_id" class="text-[10px] text-rose-500 mt-1">{{ errors.kecamatan_id[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Kelurahan / Desa</label>
                <select v-model="form.kelurahan_id" :disabled="!form.kecamatan_id" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.kelurahan_id }" required>
                  <option value="">Pilih Kelurahan</option>
                  <option v-for="item in kelurahans" :key="item.id" :value="item.id">{{ item.nama_kelurahan }}</option>
                </select>
                <p v-if="errors.kelurahan_id" class="text-[10px] text-rose-500 mt-1">{{ errors.kelurahan_id[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Logo Sekolah</label>
                <div class="flex items-center gap-4">
                  <img v-if="previewLogo" :src="previewLogo" class="w-12 h-12 rounded object-cover border" />
                  <div v-else class="w-12 h-12 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-dashed">
                    <Icon name="ph:image-square-bold" class="text-slate-400" />
                  </div>
                  <input type="file" @change="handleLogoUpload" accept="image/*" class="text-xs text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2: DATA PIC -->
          <div v-show="step === 2" class="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4">Informasi Akun PIC</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Username</label>
                <input v-model="form.pic_username" type="text" placeholder="username" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_username }" required />
                <p v-if="errors.pic_username" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_username[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input v-model="form.pic_email" type="email" placeholder="pic@example.com" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_email }" required />
                <p v-if="errors.pic_email" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_email[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Password</label>
                <input v-model="form.pic_password" type="password" placeholder="********" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_password }" required />
                <p v-if="errors.pic_password" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_password[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">NIK (16 Digit)</label>
                <input v-model="form.pic_nik" type="text" placeholder="32xxxxxxxxxxxxxx" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_nik }" required maxlength="16" />
                <p v-if="errors.pic_nik" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_nik[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                <input v-model="form.pic_full_name" type="text" placeholder="Nama Lengkap" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_full_name }" required />
                <p v-if="errors.pic_full_name" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_full_name[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                <select v-model="form.pic_gender" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_gender }" required>
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
                <p v-if="errors.pic_gender" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_gender[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Nomor HP</label>
                <input v-model="form.pic_no_hp" type="text" placeholder="08xxxxxxxxxx" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_no_hp }" required />
                <p v-if="errors.pic_no_hp" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_no_hp[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Tempat Lahir</label>
                <input v-model="form.pic_tempat_lahir" type="text" placeholder="Kota Lahir" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_tempat_lahir }" required />
                <p v-if="errors.pic_tempat_lahir" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_tempat_lahir[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                <input v-model="form.pic_tanggal_lahir" type="date" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_tanggal_lahir }" required />
                <p v-if="errors.pic_tanggal_lahir" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_tanggal_lahir[0] }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">Foto PIC</label>
                <div class="flex items-center gap-4">
                  <img v-if="previewFotoPic" :src="previewFotoPic" class="w-10 h-10 rounded-full object-cover border" />
                  <div v-else class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-dashed">
                    <Icon name="ph:user-bold" class="text-slate-400" />
                  </div>
                  <input type="file" @change="handleFotoPicUpload" accept="image/*" class="text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>

              <div class="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t dark:border-slate-700">
                <div class="col-span-full flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Alamat PIC (Jalan)</label>
                  <textarea v-model="form.pic_alamat" rows="2" placeholder="Jl. Contoh No. 123" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_alamat }" required></textarea>
                  <p v-if="errors.pic_alamat" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_alamat[0] }}</p>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">RT</label>
                  <input v-model="form.pic_rt" type="text" placeholder="001" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_rt }" required />
                  <p v-if="errors.pic_rt" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_rt[0] }}</p>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">RW</label>
                  <input v-model="form.pic_rw" type="text" placeholder="001" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_rw }" required />
                  <p v-if="errors.pic_rw" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_rw[0] }}</p>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Provinsi</label>
                  <select v-model="form.pic_provinsi_id" @change="onPicProvinsiChange" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_provinsi_id }" required>
                    <option value="">Pilih Provinsi</option>
                    <option v-for="item in provinsis" :key="item.id" :value="item.id">{{ item.nama_provinsi }}</option>
                  </select>
                  <p v-if="errors.pic_provinsi_id" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_provinsi_id[0] }}</p>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Kota / Kabupaten</label>
                  <select v-model="form.pic_kota_id" :disabled="!form.pic_provinsi_id" @change="onPicKotaChange" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_kota_id }" required>
                    <option value="">Pilih Kota</option>
                    <option v-for="item in pic_kotas" :key="item.id" :value="item.id">{{ item.nama_kota }}</option>
                  </select>
                  <p v-if="errors.pic_kota_id" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_kota_id[0] }}</p>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Kecamatan</label>
                  <select v-model="form.pic_kecamatan_id" :disabled="!form.pic_kota_id" @change="onPicKecamatanChange" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_kecamatan_id }" required>
                    <option value="">Pilih Kecamatan</option>
                    <option v-for="item in pic_kecamatans" :key="item.id" :value="item.id">{{ item.nama_kecamatan }}</option>
                  </select>
                  <p v-if="errors.pic_kecamatan_id" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_kecamatan_id[0] }}</p>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-bold text-slate-500 uppercase">Kelurahan / Desa</label>
                  <select v-model="form.pic_kelurahan_id" :disabled="!form.pic_kecamatan_id" class="form-input-custom" :class="{ 'border-rose-500 ring-1 ring-rose-500': errors.pic_kelurahan_id }" required>
                    <option value="">Pilih Kelurahan</option>
                    <option v-for="item in pic_kelurahans" :key="item.id" :value="item.id">{{ item.nama_kelurahan }}</option>
                  </select>
                  <p v-if="errors.pic_kelurahan_id" class="text-[10px] text-rose-500 mt-1">{{ errors.pic_kelurahan_id[0] }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: REVIEW -->
          <div v-show="step === 3" class="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 class="text-base font-bold text-slate-800 dark:text-white border-b dark:border-slate-700 pb-4 mb-4">Review Pendaftaran</h3>
              <p class="text-sm text-slate-500">Pastikan semua data di bawah ini sudah benar sebelum menyimpan.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <div class="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                  <Icon name="ph:school-bold" size="20" />
                  Data Sekolah
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3">
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">NPSN</span>
                    <span class="text-sm font-medium">{{ form.npsn }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Nama</span>
                    <span class="text-sm font-medium">{{ form.nama_sekolah }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Jenjang</span>
                    <span class="text-sm font-medium uppercase">{{ form.jenjang }} ({{ form.jenis_sekolah }})</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Kontak</span>
                    <span class="text-sm font-medium">{{ form.tlp_sekolah }} / {{ form.email_sekolah }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Alamat</span>
                    <span class="text-sm font-medium">{{ form.alamat_sekolah }} RT {{ form.rt }} RW {{ form.rw }}</span>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                  <Icon name="ph:user-circle-gear-bold" size="20" />
                  Data PIC
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3">
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Username</span>
                    <span class="text-sm font-medium">{{ form.pic_username }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Nama Lengkap</span>
                    <span class="text-sm font-medium">{{ form.pic_full_name }}</span>
                  </div>
                  <div class="flex justify-between border-b dark:border-slate-800 pb-2">
                    <span class="text-xs text-slate-500 font-bold">Email</span>
                    <span class="text-sm font-medium">{{ form.pic_email }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3">
              <Icon name="ph:info-bold" class="text-blue-600 flex-shrink-0" size="20" />
              <p class="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                Menyimpan data ini akan otomatis membuat akun user dengan role <strong>PIC</strong> dan menghubungkannya dengan sekolah yang didaftarkan.
              </p>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-between items-center">
            <button 
              type="button"
              @click="prevStep"
              v-show="step > 1"
              class="px-6 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Icon name="ph:arrow-left-bold" />
              Sebelumnya
            </button>
            <div v-show="step === 1"></div> <!-- Spacer -->

            <div class="flex gap-3">
              <NuxtLink to="/admin/sekolah" class="px-6 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all">
                Batal
              </NuxtLink>
              
              <button 
                v-if="step < 3"
                type="button"
                @click="nextStep"
                class="bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                Selanjutnya
                <Icon name="ph:arrow-right-bold" />
              </button>

              <button 
                v-else
                type="button" 
                @click="submitForm"
                :disabled="submitting" 
                class="bg-blue-600 text-white px-10 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <Icon v-if="submitting" name="ph:circle-notch-bold" class="animate-spin" />
                Daftarkan Sekarang
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: 'role',
  allowedRoles: ['admin']
})

const router = useRouter()
const { fetchapi } = useApi()
const { showAlert } = useAlert()
const { fetchProvinsi, fetchKota, fetchKecamatan, fetchKelurahan } = useWilayah()

const step = ref(1)
const stepLabels = ['Data Sekolah', 'Data PIC', 'Selesai']
const submitting = ref(false)
const errors = ref({})

const provinsis = ref([])
const kotas = ref([])
const kecamatans = ref([])
const kelurahans = ref([])

const pic_kotas = ref([])
const pic_kecamatans = ref([])
const pic_kelurahans = ref([])

const previewLogo = ref(null)
const previewFotoPic = ref(null)

const form = reactive({
  // Sekolah
  npsn: '',
  nama_sekolah: '',
  alamat_sekolah: '',
  rt: '',
  rw: '',
  tlp_sekolah: '',
  email_sekolah: '',
  provinsi_id: '',
  kota_id: '',
  kecamatan_id: '',
  kelurahan_id: '',
  jenjang: '',
  jenis_sekolah: '',
  logo_sekolah: null,
  
  // PIC User
  pic_username: '',
  pic_email: '',
  pic_password: '',
  pic_role_id: 2, // PIC Role
  
  // PIC Person
  pic_nik: '',
  pic_full_name: '',
  pic_gender: '',
  pic_no_hp: '',
  pic_tempat_lahir: '',
  pic_tanggal_lahir: '',
  pic_alamat: '',
  pic_rt: '',
  pic_rw: '',
  pic_provinsi_id: '',
  pic_kota_id: '',
  pic_kecamatan_id: '',
  pic_kelurahan_id: '',
  pic_foto: null
})

onMounted(async () => {
  provinsis.value = await fetchProvinsi()
})

const onProvinsiChange = async () => {
  form.kota_id = ''
  form.kecamatan_id = ''
  form.kelurahan_id = ''
  kotas.value = await fetchKota(form.provinsi_id)
}

const onKotaChange = async () => {
  form.kecamatan_id = ''
  form.kelurahan_id = ''
  kecamatans.value = await fetchKecamatan(form.kota_id)
}

const onKecamatanChange = async () => {
  form.kelurahan_id = ''
  kelurahans.value = await fetchKelurahan(form.kecamatan_id)
}

// PIC Address Changes
const onPicProvinsiChange = async () => {
  form.pic_kota_id = ''
  form.pic_kecamatan_id = ''
  form.pic_kelurahan_id = ''
  pic_kotas.value = await fetchKota(form.pic_provinsi_id)
}

const onPicKotaChange = async () => {
  form.pic_kecamatan_id = ''
  form.pic_kelurahan_id = ''
  pic_kecamatans.value = await fetchKecamatan(form.pic_kota_id)
}

const onPicKecamatanChange = async () => {
  form.pic_kelurahan_id = ''
  pic_kelurahans.value = await fetchKelurahan(form.pic_kecamatan_id)
}

const handleLogoUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.logo_sekolah = file
    previewLogo.value = URL.createObjectURL(file)
  }
}

const handleFotoPicUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.pic_foto = file
    previewFotoPic.value = URL.createObjectURL(file)
  }
}

const validateStep = (currentStep) => {
  errors.value = {}
  let isValid = true

  if (currentStep === 1) {
    const fields = [
      { key: 'npsn', label: 'NPSN' },
      { key: 'nama_sekolah', label: 'Nama Sekolah' },
      { key: 'jenjang', label: 'Jenjang' },
      { key: 'jenis_sekolah', label: 'Jenis Sekolah' },
      { key: 'alamat_sekolah', label: 'Alamat Sekolah' },
      { key: 'rt', label: 'RT' },
      { key: 'rw', label: 'RW' },
      { key: 'tlp_sekolah', label: 'Telepon Sekolah' },
      { key: 'email_sekolah', label: 'Email Sekolah' },
      { key: 'provinsi_id', label: 'Provinsi' },
      { key: 'kota_id', label: 'Kota' },
      { key: 'kecamatan_id', label: 'Kecamatan' },
      { key: 'kelurahan_id', label: 'Kelurahan' }
    ]

    fields.forEach(f => {
      if (!form[f.key]) {
        errors.value[f.key] = [`${f.label} wajib diisi`]
        isValid = false
      }
    })
  } else if (currentStep === 2) {
    const fields = [
      { key: 'pic_username', label: 'Username' },
      { key: 'pic_email', label: 'Email' },
      { key: 'pic_password', label: 'Password' },
      { key: 'pic_nik', label: 'NIK' },
      { key: 'pic_full_name', label: 'Nama Lengkap' },
      { key: 'pic_gender', label: 'Jenis Kelamin' },
      { key: 'pic_no_hp', label: 'Nomor HP' },
      { key: 'pic_tempat_lahir', label: 'Tempat Lahir' },
      { key: 'pic_tanggal_lahir', label: 'Tanggal Lahir' },
      { key: 'pic_alamat', label: 'Alamat' },
      { key: 'pic_rt', label: 'RT' },
      { key: 'pic_rw', label: 'RW' },
      { key: 'pic_provinsi_id', label: 'Provinsi PIC' },
      { key: 'pic_kota_id', label: 'Kota PIC' },
      { key: 'pic_kecamatan_id', label: 'Kecamatan PIC' },
      { key: 'pic_kelurahan_id', label: 'Kelurahan PIC' }
    ]

    fields.forEach(f => {
      if (!form[f.key]) {
        errors.value[f.key] = [`${f.label} wajib diisi`]
        isValid = false
      }
    })
  }

  return isValid
}

const nextStep = () => {
  if (validateStep(step.value)) {
    if (step.value < 3) step.value++
  }
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const submitForm = async () => {
  submitting.value = true
  errors.value = {}

  try {
    const formData = new FormData()
    
    // Append all form fields
    for (const key in form) {
      if (form[key] !== null && form[key] !== '') {
        formData.append(key, form[key])
      }
    }

    const token = useCookie('access_token')
    await fetchapi('/admin/sekolah', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`
      }
    })

    showAlert({
      title: 'Berhasil!',
      text: 'Sekolah dan PIC telah didaftarkan.',
      icon: 'success',
      timer: 1500
    })
    
    router.push('/admin/sekolah')
  } catch (error) {
    if (error.status === 422) {
      errors.value = error.data?.errors || {}
      step.value = 1 // Go back to show errors if any (simple logic)
      showAlert({
        title: 'Validasi Gagal!',
        text: 'Mohon periksa kembali inputan Anda.',
        icon: 'error'
      })
    } else {
      showAlert({
        title: 'Gagal!',
        text: error.data?.message || 'Terjadi kesalahan saat mendaftarkan sekolah.',
        icon: 'error'
      })
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-input-custom {
  @apply w-full p-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-700 dark:text-slate-200;
}
</style>
