<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiswaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'nisn'     => $this->nisn,
            'nis'      => $this->nis,
            'status'   => $this->status,

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
                    'id'           => $this->sekolah->id,
                    'nama_sekolah' => $this->sekolah->nama_sekolah,
                ];
            }),

            // ── Relasi tahun ajaran ──────────────────────────────────
            'tahun_ajaran' => $this->whenLoaded('tahunAjaran', function () {
                return [
                    'id'           => $this->tahunAjaran->id,
                    'tahun_ajaran' => $this->tahunAjaran->tahun_ajaran,
                ];
            }),

            // ── Relasi kelas ─────────────────────────────────────────
            'kelas' => $this->whenLoaded('kelas', function () {
                return $this->kelas->map(function ($kelas) {
                    return [
                        'id'            => $kelas->id,
                        'tingkat_kelas' => $kelas->tingkat_kelas,
                        'nama_kelas'    => $kelas->nama_kelas,
                        'jurusan'       => $kelas->jurusan?->nama_jurusan,
                    ];
                });
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
