<?php

namespace App\Http\Resources\Wilayah;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProvinsiResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'kode_prov'     => $this->kode_prov,
            'nama_provinsi' => $this->nama_provinsi,
        ];
    }
}
