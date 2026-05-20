<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuruResource extends JsonResource
{
    /**
     * Format response JSON untuk satu data guru.
     *
     * Struktur output:
     * {
     *   "data": {
     *     "id": 1,
     *     "nuptk": "...",
     *     ...
     *     "user": { "id": 1, "email": "...", "person": { ... } },
     *     "mgmp": { "id": 1, "nama_mgmp": "..." },
     *     "sekolah": [ { "id": 1, "nama_sekolah": "...", "status": "aktif" } ]
     *   }
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'nuptk'          => $this->nuptk,
            'nrg'            => $this->nrg,
            'nip'            => $this->nip,
            'gelar_depan'    => $this->gelar_depan,
            'gelar_belakang' => $this->gelar_belakang,
            'nama_lengkap'   => $this->namaLengkap(),    // computed: gelar + nama
            'alamat'         => $this->alamatLengkap(),   // computed: alamat lengkap
            // ── Relasi user & person ─────────────────────────────────
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id'       => $this->user->id,
                    'username' => $this->user->username,
                    'email'    => $this->user->email,
                    // password TIDAK pernah dikembalikan
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
                            'foto'         => $person->photo
                                ? asset('storage/' . $person->photo)
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

            // ── Relasi MGMP ──────────────────────────────────────────
            'mgmp' => $this->whenLoaded('mgmp', function () {
                return [
                    'id'        => $this->mgmp->id,
                    'nama_mgmp' => $this->mgmp->nama_mgmp,
                ];
            }),

            // ── Relasi sekolah (pivot guru_sekolah) ──────────────────
            // ->withPivot('status') wajib ada di Model Guru
            'sekolah' => $this->whenLoaded('sekolah', function () {
                return $this->sekolah->map(function ($sekolah) {
                    return [
                        'id'           => $sekolah->id,
                        'npsn'         => $sekolah->npsn,
                        'nama_sekolah' => $sekolah->nama_sekolah,
                        'tingkat'      => $sekolah->jenjang,
                        'jenis'        => $sekolah->jenis_sekolah,
                        // kolom dari pivot tabel guru_sekolah
                        'status_guru'  => $sekolah->pivot->status,
                    ];
                });
            }),

            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }

    /**
     * Helper: gabungkan gelar depan, nama, dan gelar belakang.
     */
    private function namaLengkap(): string
    {
        $parts = array_filter([
            $this->gelar_depan,
            $this->user?->person?->full_name,
            $this->gelar_belakang,
        ]);

        return implode(' ', $parts);
    }

    private function alamatLengkap(): string
    {
        $person = $this->user?->person;
        if (!$person) return '';

        $parts = array_filter([
            $person->alamat,
            $person->rt ? 'RT ' . $person->rt : null,
            $person->rw ? 'RW ' . $person->rw : null,
            $person->kelurahan ? $person->kelurahan->tipe_kelurahan . ' ' . $person->kelurahan->nama_kelurahan : null,
            $person->kecamatan ? 'Kecamatan ' . $person->kecamatan->nama_kecamatan : null,
            $person->kota?->nama_kota,
            $person->provinsi ? 'Provinsi ' . $person->provinsi->nama_provinsi : null,
        ]);

        return implode(', ', $parts);
    }

    /**
     * Tambahkan wrapper "data" dan meta di level collection.
     * Dipakai saat return GuruResource::collection($paginator).
     */
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
