<?php

namespace App\Http\Requests\Api\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->role->name === 'admin';
    }

    public function rules(): array
    {
        return [
            'username' => ['nullable', 'string', 'max:255', 'unique:users,username'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role_id'  => ['required', 'integer', 'exists:role,id'],
            'nik'           => ['required', 'string', 'digits:16', 'unique:people,nik'],
            'full_name'     => ['required', 'string', 'max:255'],
            'gender'        => ['required', 'in:L,P'],
            'tempat_lahir'  => ['required', 'string', 'max:255'],
            'tanggal_lahir' => ['required', 'date'],
            'alamat'        => ['required', 'string'],
            'provinsi_id'   => ['required', 'exists:provinsis,id'],
            'kota_id'       => ['required', 'exists:kotas,id'],
            'kecamatan_id'  => ['required', 'exists:kecamatans,id'],
            'kelurahan_id'  => ['required', 'exists:kelurahans,id'],
            'rt'            => ['required', 'string', 'max:10'],
            'rw'            => ['required', 'string', 'max:10'],
            'no_hp'         => ['required', 'string', 'max:20'],
            'foto'          => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required'  => 'Email wajib diisi.',
            'email.email'     => 'Format email tidak valid.',
            'email.unique'    => 'Email sudah terdaftar.',
            'password.required' => 'Password wajib diisi.',
            'password.min'    => 'Password minimal 8 karakter.',
            'role_id.required' => 'Role wajib dipilih.',
            'role_id.exists'  => 'Role tidak ditemukan.',
        ];
    }

    public function attributes(): array
    {
        return [
            'username' => 'username',
            'email'    => 'email',
            'password' => 'password',
            'role_id'  => 'role',
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
