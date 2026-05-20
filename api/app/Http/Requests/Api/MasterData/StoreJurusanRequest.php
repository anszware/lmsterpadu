<?php

namespace App\Http\Requests\Api\MasterData;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreJurusanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->role->name === 'admin';
    }

    public function rules(): array
    {
        return [
            'nama_jurusan' => ['required', 'string', 'max:255'],
            'kode_jurusan' => ['required', 'string', 'max:20', 'unique:jurusan,kode_jurusan'],
            'deskripsi'    => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_jurusan.required' => 'Nama jurusan wajib diisi.',
            'kode_jurusan.required' => 'Kode jurusan wajib diisi.',
            'kode_jurusan.unique'   => 'Kode jurusan sudah terdaftar.',
            'deskripsi.max'         => 'Deskripsi maksimal 500 karakter.',
        ];
    }

    public function attributes(): array
    {
        return [
            'nama_jurusan' => 'nama jurusan',
            'kode_jurusan' => 'kode jurusan',
            'deskripsi'    => 'deskripsi',
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
