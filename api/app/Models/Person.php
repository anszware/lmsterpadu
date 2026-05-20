<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Person extends Model
{
    use SoftDeletes;

    protected $table = 'people';
    protected $fillable = [
        'user_id',
        'nik',
        'full_name',
        'gender',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat',
        'provinsi_id',
        'kota_id',
        'kecamatan_id',
        'kelurahan_id',
        'rt',
        'rw',
        'no_hp',
        'foto',
    ];

    protected $appends = ['alamat_lengkap'];

    public function getAlamatLengkapAttribute(): string
    {
        $addressParts = [];

        if ($this->alamat) {
            $addressParts[] = $this->alamat;
        }

        if ($this->rt) {
            $addressParts[] = "Rt. " . $this->rt;
        }

        if ($this->rw) {
            $addressParts[] = "/Rw. " . $this->rw;
        }

        if ($this->kelurahan) {
            $addressParts[] = $this->kelurahan->tipe_kelurahan . " " . $this->kelurahan->nama_kelurahan;
        }

        if ($this->kecamatan) {
            $addressParts[] = 'Kecamatan ' . $this->kecamatan->nama_kecamatan . '"';
        }

        if ($this->kota) {
            $addressParts[] = $this->kota->nama_kota;
        }

        if ($this->provinsi) {
            $addressParts[] = 'Provinsi ' . $this->provinsi->nama_provinsi;
        }

        return implode(' ', $addressParts);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function provinsi(): BelongsTo
    {
        return $this->belongsTo(Provinsi::class);
    }

    public function kota(): BelongsTo
    {
        return $this->belongsTo(Kota::class);
    }

    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class);
    }

    public function kelurahan(): BelongsTo
    {
        return $this->belongsTo(Kelurahan::class);
    }
}
