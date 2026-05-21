<?php

namespace App\Http\Requests\Api\Sekolah;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSekolahRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->role->name === 'admin';
    }

    public function rules(): array
    {
        return [
            // ── Data Sekolah ───────────────────────────────────────────
            'npsn'           => ['required', 'string', 'max:20', 'unique:sekolah,npsn'],
            'nama_sekolah'   => ['required', 'string', 'max:255'],
            'alamat_sekolah' => ['required', 'string'],
            'provinsi_id'    => ['required', 'exists:provinsis,id'],
            'kota_id'        => ['required', 'exists:kotas,id'],
            'kecamatan_id'   => ['required', 'exists:kecamatans,id'],
            'kelurahan_id'   => ['required', 'exists:kelurahans,id'],
            'rt'             => ['nullable', 'string', 'max:5'],
            'rw'             => ['nullable', 'string', 'max:5'],
            'tlp_sekolah'    => ['nullable', 'string', 'max:20'],
            'email_sekolah'  => ['nullable', 'email', 'max:255'],
            'jenjang'        => ['required', 'in:sd,mi,smp,mts,sma,ma,smk,mak'],
            'jenis_sekolah'  => ['required', 'in:negeri,swasta'],
            'logo_sekolah'   => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],

            // ── Data User PIC ──────────────────────────────────────────
            'pic_username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'pic_email'    => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'pic_password' => ['required', 'string', 'min:8'],
            
            // ── Data Person PIC ────────────────────────────────────────
            'pic_nik'           => ['required', 'string', 'digits:16', 'unique:people,nik'],
            'pic_full_name'     => ['required', 'string', 'max:255'],
            'pic_gender'        => ['required', 'in:L,P'],
            'pic_no_hp'         => ['required', 'string', 'max:20'],
            'pic_tempat_lahir'  => ['required', 'string', 'max:255'],
            'pic_tanggal_lahir' => ['required', 'date'],
            'pic_alamat'        => ['required', 'string'],
            'pic_foto'          => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }

    public function attributes(): array
    {
        return [
            'npsn' => 'NPSN',
            'pic_username' => 'username PIC',
            'pic_email' => 'email PIC',
            'pic_nik' => 'NIK PIC',
            'pic_full_name' => 'nama lengkap PIC',
        ];
    }
}
