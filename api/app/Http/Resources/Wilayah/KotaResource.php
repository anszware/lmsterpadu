<?php

namespace App\Http\Resources\Wilayah;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KotaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'kode_kota' => $this->kode_kota,
            'nama_kota' => $this->nama_kota,
            'tipe'      => str_contains(strtolower($this->nama_kota), 'kota')
                            ? 'Kota'
                            : 'Kabupaten',
            // relasi hanya muncul jika di-load
            'provinsi'  => $this->whenLoaded('provinsi', fn() => [
                'id'            => $this->provinsi->id,
                'nama_provinsi' => $this->provinsi->nama_provinsi,
            ]),
        ];
    }
}
