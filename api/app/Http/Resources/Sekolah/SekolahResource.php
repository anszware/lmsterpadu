<?php

namespace App\Http\Resources\Sekolah;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Wilayah\ProvinsiResource;
use App\Http\Resources\Wilayah\KotaResource;
use App\Http\Resources\Wilayah\KecamatanResource;
use App\Http\Resources\Wilayah\KelurahanResource;

class SekolahResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'npsn'           => $this->npsn,
            'nama_sekolah'   => $this->nama_sekolah,
            'alamat_sekolah' => $this->alamat_sekolah,
            'provinsi_id'    => $this->provinsi_id,
            'kota_id'        => $this->kota_id,
            'kecamatan_id'   => $this->kecamatan_id,
            'kelurahan_id'   => $this->kelurahan_id,
            'rt'             => $this->rt,
            'rw'             => $this->rw,
            'tlp_sekolah'    => $this->tlp_sekolah,
            'email_sekolah'  => $this->email_sekolah,
            'logo_sekolah'   => $this->logo_sekolah ? asset('storage/' . $this->logo_sekolah) : null,
            'jenjang'        => $this->jenjang,
            'jenis_sekolah'  => $this->jenis_sekolah,
            
            // Relationship if loaded
            'provinsi'  => new ProvinsiResource($this->whenLoaded('provinsi')),
            'kota'      => new KotaResource($this->whenLoaded('kota')),
            'kecamatan' => new KecamatanResource($this->whenLoaded('kecamatan')),
            'kelurahan' => new KelurahanResource($this->whenLoaded('kelurahan')),
            
            'pic' => $this->whenLoaded('pic', function() {
                // Assuming Sekolah hasMany PICs or hasOne main PIC
                // Typically PIC is a relation to users via pic table
                return $this->pic->map(function($pic) {
                    return [
                        'id' => $pic->id,
                        'user_id' => $pic->user_id,
                        'username' => $pic->user->username,
                        'full_name' => $pic->user->person->full_name,
                        'status' => $pic->status
                    ];
                });
            }),

            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
