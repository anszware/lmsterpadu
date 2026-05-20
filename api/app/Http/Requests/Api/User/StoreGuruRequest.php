<?php

namespace App\Http\Requests\Api\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreGuruRequest extends FormRequest
{
    /**
     * Hanya user dengan role admin yang boleh akses.
     */
    public function authorize(): bool
    {
        return $this->user()->role->name === 'admin';
    }

    /**
     * Aturan validasi input.
     */
    public function rules(): array
    {
        return [
            // ── Data user ────────────────────────────────────────────
            'username'       => ['nullable', 'string', 'max:255', 'unique:users,username'],
            'email'          => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password'       => ['required', 'string', 'min:8', 'confirmed'],
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

            // ── Data guru ────────────────────────────────────────────
            'mgmp_id'        => ['nullable', 'integer', 'exists:mgmp,id'],
            'nuptk'          => ['nullable', 'string', 'max:20', 'unique:guru,nuptk'],
            'nrg'            => ['nullable', 'string', 'max:20', 'unique:guru,nrg'],
            'nip'            => ['nullable', 'string', 'max:20', 'unique:guru,nip'],
            'gelar_depan'    => ['nullable', 'string', 'max:10'],
            'gelar_belakang' => ['required', 'string', 'max:20'],

            // ── Pivot guru_sekolah ───────────────────────────────────
            'sekolah_id'     => ['required', 'integer', 'exists:sekolah,id'],
            'status_guru'    => ['required', 'in:aktif,nonaktif'],
        ];
    }

    /**
     * Pesan error kustom per field.
     */
    public function messages(): array
    {
        return [
            // user
            'email.required'         => 'Email wajib diisi.',
            'email.email'            => 'Format email tidak valid.',
            'email.unique'           => 'Email sudah terdaftar.',
            'password.required'      => 'Password wajib diisi.',
            'password.min'           => 'Password minimal 8 karakter.',
            'password.confirmed'     => 'Konfirmasi password tidak cocok.',
            'password_confirmation.required' => 'Konfirmasi password wajib diisi.',
            'password_confirmation.min' => 'Konfirmasi password minimal 8 karakter.',
            // person
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

            // guru
            'mgmp_id.exists'         => 'MGMP tidak ditemukan.',
            'nuptk.unique'           => 'NUPTK sudah terdaftar.',
            'nrg.unique'             => 'NRG sudah terdaftar.',
            'nip.unique'             => 'NIP sudah terdaftar.',
            'gelar_belakang.required' => 'Gelar belakang wajib diisi.',

            // pivot
            'sekolah_id.required'    => 'Sekolah wajib dipilih.',
            'sekolah_id.exists'      => 'Sekolah tidak ditemukan.',
            'status_guru.required'   => 'Status guru wajib dipilih.',
            'status_guru.in'         => 'Status guru harus aktif atau nonaktif.',
        ];
    }

    /**
     * Label nama field (ditampilkan di pesan error default Laravel).
     */
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
            'mgmp_id'        => 'MGMP',
            'nuptk'          => 'NUPTK',
            'nrg'            => 'NRG',
            'nip'            => 'NIP',
            'gelar_depan'    => 'gelar depan',
            'gelar_belakang' => 'gelar belakang',
            'sekolah_id'     => 'sekolah',
            'status_guru'    => 'status guru',
        ];
    }

    /**
     * Override response error agar format JSON konsisten.
     * Dipanggil otomatis oleh Laravel jika validasi gagal.
     */
    protected function failedValidation(Validator $validator): never
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Data yang dikirim tidak valid.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }

    /**
     * Override response jika user tidak punya akses (authorize = false).
     */
    protected function failedAuthorization(): never
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Anda tidak memiliki akses untuk melakukan aksi ini.',
            ], 403)
        );
    }
}
