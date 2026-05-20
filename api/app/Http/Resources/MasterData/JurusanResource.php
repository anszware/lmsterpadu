<?php

namespace App\Http\Resources\MasterData;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JurusanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'nama_jurusan' => $this->nama_jurusan,
            'kode_jurusan' => $this->kode_jurusan,
            'deskripsi'    => $this->deskripsi,
            'created_at'   => $this->created_at?->toDateTimeString(),
            'updated_at'   => $this->updated_at?->toDateTimeString(),
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
