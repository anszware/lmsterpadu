<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PicResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'     => $this->id,
            'status' => $this->status,

            // ── Relasi user & person ─────────────────────────────────
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id'       => $this->user->id,
                    'username' => $this->user->username,
                    'email'    => $this->user->email,
                    'role'     => $this->user->role?->name,
                    'person'   => $this->whenLoaded('user', function () {
                        $person = $this->user->person;
                        if (!$person) return null;

                        return [
                            'nik'          => $person->nik,
                            'full_name'    => $person->full_name,
                            'gender'       => $person->gender,
                            'tempat_lahir' => $person->tempat_lahir,
                            'tanggal_lahir' => $person->tanggal_lahir,
                            'alamat'       => $person->alamat,
                            'rt'           => $person->rt,
                            'rw'           => $person->rw,
                            'no_hp'        => $person->no_hp,
                            'foto'         => $person->foto
                                ? asset('storage/' . $person->foto)
                                : null,
                            'wilayah'      => [
                                'provinsi'  => $person->provinsi?->nama_provinsi,
                                'kota'      => $person->kota?->nama_kota,
                                'kecamatan' => $person->kecamatan?->nama_kecamatan,
                                'kelurahan' => $person->kelurahan?->nama_kelurahan,
                            ],
                        ];
                    }),
                ];
            }),

            // ── Relasi sekolah ───────────────────────────────────────
            'sekolah' => $this->whenLoaded('sekolah', function () {
                return [
                    'id'            => $this->sekolah->id,
                    'npsn'          => $this->sekolah->npsn,
                    'nama_sekolah'  => $this->sekolah->nama_sekolah,
                    'alamat_sekolah' => $this->sekolah->alamat_sekolah,
                    'tlp_sekolah'   => $this->sekolah->tlp_sekolah,
                    'email_sekolah' => $this->sekolah->email_sekolah,
                    'jenjang'       => $this->sekolah->jenjang,
                    'jenis_sekolah' => $this->sekolah->jenis_sekolah,
                ];
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
