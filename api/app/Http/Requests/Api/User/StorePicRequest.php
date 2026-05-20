<?php

namespace App\Http\Requests\Api\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StorePicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role?->name === 'admin';
    }

    public function rules(): array
    {
        return [
            // ── Data user ────────────────────────────────────────────
            'username'  => ['nullable', 'string', 'max:255', 'unique:users,username'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password'  => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:8'],

            // ── Data person ──────────────────────────────────────────
            'nik'            => ['required', 'numeric', 'digits:16', 'unique:people,nik'],
            'full_name'      => ['required', 'string', 'max:255'],
            'gender'         => ['required', 'in:L,P'],
            'tempat_lahir'   => ['required', 'string', 'max:255'],
            'tanggal_lahir'  => ['required', 'date', 'before:today'],
            'alamat'         => ['required', 'string', 'max:500'],
            'provinsi_id'    => ['required', 'integer', 'exists:provinsis,id'],
            'kota_id'        => ['required', 'integer', 'exists:kotas,id'],
            'kecamatan_id'   => ['required', 'integer', 'exists:kecamatans,id'],
            'kelurahan_id'   => ['required', 'integer', 'exists:kelurahans,id'],
            'rt'             => ['required', 'string', 'max:3'],
            'rw'             => ['required', 'string', 'max:3'],
            'no_hp'          => ['required', 'string', 'max:16'],
            'foto'           => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],

            // ── Data sekolah (baru) ───────────────────────────────────
            'npsn'              => ['required', 'string', 'max:12', 'unique:sekolah,npsn'],
            'nama_sekolah'      => ['required', 'string', 'max:255'],
            'alamat_sekolah'    => ['required', 'string', 'max:255'],
            'provinsi_id_sekolah' => ['required', 'integer', 'exists:provinsis,id'],
            'kota_id_sekolah'     => ['required', 'integer', 'exists:kotas,id'],
            'kecamatan_id_sekolah' => ['required', 'integer', 'exists:kecamatans,id'],
            'kelurahan_id_sekolah' => ['required', 'integer', 'exists:kelurahans,id'],
            'rt_sekolah'        => ['nullable', 'string', 'max:3'],
            'rw_sekolah'        => ['nullable', 'string', 'max:3'],
            'tlp_sekolah'       => ['required', 'string', 'max:16'],
            'email_sekolah'     => ['required', 'string', 'email', 'max:255', 'unique:sekolah,email_sekolah'],
            'jenjang'           => ['required', 'in:sd,mi,smp,mts,sma,ma,smk,mak'],
            'jenis_sekolah'     => ['required', 'in:swasta,negeri'],

            // ── Data pic ─────────────────────────────────────────────
            'status_pic' => ['required', 'in:aktif,nonaktif'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required'         => 'Email wajib diisi.',
            'email.email'            => 'Format email tidak valid.',
            'email.unique'           => 'Email sudah terdaftar.',
            'password.required'      => 'Password wajib diisi.',
            'password.min'           => 'Password minimal 8 karakter.',
            'password.confirmed'     => 'Konfirmasi password tidak cocok.',
            'password_confirmation.required' => 'Konfirmasi password wajib diisi.',
            'nik.required'           => 'NIK wajib diisi.',
            'nik.digits'             => 'NIK harus 16 digit.',
            'nik.unique'             => 'NIK sudah terdaftar.',
            'full_name.required'     => 'Nama lengkap wajib diisi.',
            'gender.required'        => 'Jenis kelamin wajib dipilih.',
            'gender.in'              => 'Jenis kelamin harus L atau P.',
            'tempat_lahir.required'  => 'Tempat lahir wajib diisi.',
            'tanggal_lahir.required' => 'Tanggal lahir wajib diisi.',
            'tanggal_lahir.before'   => 'Tanggal lahir harus sebelum hari ini.',
            'alamat.required'        => 'Alamat wajib diisi.',
            'provinsi_id.required'   => 'Provinsi wajib dipilih.',
            'provinsi_id.exists'     => 'Provinsi tidak ditemukan.',
            'kota_id.required'       => 'Kota/kabupaten wajib dipilih.',
            'kota_id.exists'         => 'Kota/kabupaten tidak ditemukan.',
            'kecamatan_id.required'  => 'Kecamatan wajib dipilih.',
            'kecamatan_id.exists'    => 'Kecamatan tidak ditemukan.',
            'kelurahan_id.required'  => 'Kelurahan/desa wajib dipilih.',
            'kelurahan_id.exists'    => 'Kelurahan/desa tidak ditemukan.',
            'rt.required'            => 'RT wajib diisi.',
            'rw.required'            => 'RW wajib diisi.',
            'no_hp.required'         => 'Nomor HP wajib diisi.',
            'foto.image'             => 'File harus berupa gambar.',
            'foto.mimes'             => 'Format foto harus jpeg, png, atau jpg.',
            'foto.max'               => 'Ukuran foto maksimal 2MB.',
            'npsn.required'          => 'NPSN wajib diisi.',
            'npsn.unique'            => 'NPSN sudah terdaftar.',
            'nama_sekolah.required'  => 'Nama sekolah wajib diisi.',
            'alamat_sekolah.required' => 'Alamat sekolah wajib diisi.',
            'tlp_sekolah.required'   => 'Telepon sekolah wajib diisi.',
            'email_sekolah.required'  => 'Email sekolah wajib diisi.',
            'email_sekolah.unique'   => 'Email sekolah sudah terdaftar.',
            'jenjang.required'       => 'Jenjang wajib dipilih.',
            'jenjang.in'             => 'Jenjang tidak valid.',
            'jenis_sekolah.required' => 'Jenis sekolah wajib dipilih.',
            'jenis_sekolah.in'       => 'Jenis sekolah harus negeri atau swasta.',
            'status_pic.required'    => 'Status PIC wajib dipilih.',
            'status_pic.in'          => 'Status PIC harus aktif atau nonaktif.',
        ];
    }

    public function attributes(): array
    {
        return [
            'email'          => 'email',
            'password'       => 'password',
            'nik'            => 'NIK',
            'full_name'      => 'nama lengkap',
            'gender'         => 'jenis kelamin',
            'tempat_lahir'   => 'tempat lahir',
            'tanggal_lahir'  => 'tanggal lahir',
            'alamat'         => 'alamat',
            'provinsi_id'    => 'provinsi',
            'kota_id'        => 'kota/kabupaten',
            'kecamatan_id'   => 'kecamatan',
            'kelurahan_id'   => 'kelurahan/desa',
            'rt'             => 'RT',
            'rw'             => 'RW',
            'no_hp'          => 'nomor HP',
            'foto'           => 'foto',
            'npsn'           => 'NPSN',
            'nama_sekolah'   => 'nama sekolah',
            'alamat_sekolah' => 'alamat sekolah',
            'tlp_sekolah'    => 'telepon sekolah',
            'email_sekolah'  => 'email sekolah',
            'jenjang'        => 'jenjang',
            'jenis_sekolah'  => 'jenis sekolah',
            'status_pic'     => 'status PIC',
        ];
    }

    protected function failedValidation(Validator $validator): never
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Data yang dikirim tidak valid.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }

    protected function failedAuthorization(): never
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Anda tidak memiliki akses untuk melakukan aksi ini.',
            ], 403)
        );
    }
}
