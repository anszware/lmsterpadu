<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'username' => $this->username,
            'email'    => $this->email,
            'role'     => $this->whenLoaded('role', function () {
                return [
                    'id'   => $this->role->id,
                    'name' => $this->role->name,
                ];
            }),
            'person' => $this->whenLoaded('person', function () {
                return $this->person ? [
                    'id'          => $this->person->id,
                    'nik'         => $this->person->nik,
                    'full_name'   => $this->person->full_name,
                    'gender'      => $this->person->gender,
                    'tempat_lahir' => $this->person->tempat_lahir,
                    'tanggal_lahir' => $this->person->tanggal_lahir,
                    'alamat'      => $this->person->alamat,
                    'provinsi_id' => $this->person->provinsi_id,
                    'kota_id'     => $this->person->kota_id,
                    'kecamatan_id' => $this->person->kecamatan_id,
                    'kelurahan_id' => $this->person->kelurahan_id,
                    'rt'          => $this->person->rt,
                    'rw'          => $this->person->rw,
                    'no_hp'       => $this->person->no_hp,
                    'foto'        => $this->person->foto
                        ? asset('storage/' . $this->person->foto)
                        : null,
                ] : null;
            }),
            'sekolah' => $this->whenLoaded('sekolah', function () {
                return $this->sekolah ? [
                    'id'           => $this->sekolah->id,
                    'npsn'         => $this->sekolah->npsn,
                    'nama_sekolah' => $this->sekolah->nama_sekolah,
                ] : null;
            }),
            'guru' => $this->whenLoaded('guru', function () {
                return $this->guru ? ['id' => $this->guru->id] : null;
            }),
            'siswa' => $this->whenLoaded('siswa', function () {
                return $this->siswa ? ['id' => $this->siswa->id] : null;
            }),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }

    public static function collection($resource)
    {
        return parent::collection($resource)->additional([
            'meta' => [
                'total'    => method_exists($resource, 'total') ? $resource->total() : null,
                'per_page' => method_exists($resource, 'perPage') ? $resource->perPage() : null,
                'page'     => method_exists($resource, 'currentPage') ? $resource->currentPage() : null,
            ],
        ]);
    }
}
