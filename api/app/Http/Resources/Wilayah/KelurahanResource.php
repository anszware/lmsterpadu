<?php

namespace App\Http\Resources\Wilayah;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KelurahanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'kode_kelurahan' => $this->kode_kelurahan,
            'tipe'           => $this->tipe_kelurahan, // 'Kelurahan' | 'Desa'
            'nama_kelurahan' => $this->nama_kelurahan,
            'nama_lengkap'   => $this->tipe_kelurahan . ' ' . $this->nama_kelurahan,
            // relasi hanya muncul jika di-load
            'kecamatan'    => $this->whenLoaded('kecamatan', fn() => [
                'id'             => $this->kecamatan->id,
                'nama_kecamatan' => $this->kecamatan->nama_kecamatan,
                'kota'           => $this->kecamatan->relationLoaded('kota') ? [
                    'id'        => $this->kecamatan->kota->id,
                    'nama_kota' => $this->kecamatan->kota->nama_kota,
                    'provinsi'  => $this->kecamatan->kota->relationLoaded('provinsi') ? [
                        'id'            => $this->kecamatan->kota->provinsi->id,
                        'nama_provinsi' => $this->kecamatan->kota->provinsi->nama_provinsi,
                    ] : null,
                ] : null,
            ]),
        ];
    }
}
