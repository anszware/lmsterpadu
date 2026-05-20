<?php

namespace App\Http\Requests\Api\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreSiswaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()->role->name, ['admin', 'pic']);
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
            'no_hp'          => ['required', 'string', 'max:16'],
            'foto'           => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],

            // ── Data siswa ───────────────────────────────────────────
            'nisn'          => ['required', 'string', 'max:20', 'unique:siswa,nisn'],
            'nis'           => ['nullable', 'string', 'max:20'],
            'tahun_ajara_id' => ['required', 'integer', 'exists:tahun_ajaran,id'],
            'kelas_id'      => ['required', 'integer', 'exists:kelas,id'],
            'status'        => ['required', 'in:aktif,alumni,pindah,keluar'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required'          => 'Email wajib diisi.',
            'email.email'             => 'Format email tidak valid.',
            'email.unique'            => 'Email sudah terdaftar.',
            'password.required'       => 'Password wajib diisi.',
            'password.min'            => 'Password minimal 8 karakter.',
            'password.confirmed'      => 'Konfirmasi password tidak cocok.',
            'nik.required'            => 'NIK wajib diisi.',
            'nik.digits'              => 'NIK harus 16 digit.',
            'nik.unique'              => 'NIK sudah terdaftar.',
            'full_name.required'      => 'Nama lengkap wajib diisi.',
            'gender.required'         => 'Jenis kelamin wajib dipilih.',
            'gender.in'               => 'Jenis kelamin harus L atau P.',
            'tempat_lahir.required'   => 'Tempat lahir wajib diisi.',
            'tanggal_lahir.required'  => 'Tanggal lahir wajib diisi.',
            'tanggal_lahir.before'    => 'Tanggal lahir harus sebelum hari ini.',
            'alamat.required'         => 'Alamat wajib diisi.',
            'no_hp.required'          => 'Nomor HP wajib diisi.',
            'nisn.required'           => 'NISN wajib diisi.',
            'nisn.unique'             => 'NISN sudah terdaftar.',
            'tahun_ajara_id.required' => 'Tahun ajaran wajib dipilih.',
            'tahun_ajara_id.exists'   => 'Tahun ajaran tidak ditemukan.',
            'kelas_id.required'       => 'Kelas wajib dipilih.',
            'kelas_id.exists'         => 'Kelas tidak ditemukan.',
            'foto.image'              => 'File harus berupa gambar.',
            'foto.max'                => 'Ukuran foto maksimal 2MB.',
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
            'no_hp'          => 'nomor HP',
            'nisn'           => 'NISN',
            'nis'            => 'NIS',
            'tahun_ajara_id' => 'tahun ajaran',
            'kelas_id'       => 'kelas',
            'foto'           => 'foto',
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
