<?php

namespace App\Http\Resources\Wilayah;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KecamatanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'kode_kecamatan' => $this->kode_kecamatan,
            'nama_kecamatan' => $this->nama_kecamatan,
            // relasi hanya muncul jika di-load
            'kota'           => $this->whenLoaded('kota', fn() => [
                'id'        => $this->kota->id,
                'nama_kota' => $this->kota->nama_kota,
                'provinsi'  => $this->whenLoaded('kota', fn() =>
                    $this->kota->relationLoaded('provinsi') ? [
                        'id'            => $this->kota->provinsi->id,
                        'nama_provinsi' => $this->kota->provinsi->nama_provinsi,
                    ] : null
                ),
            ]),
        ];
    }
}
