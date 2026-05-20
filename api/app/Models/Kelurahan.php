<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kelurahan extends Model
{
    protected $table = 'kelurahans';
    protected $fillable = [
        'kecamatan_id',
        'kode_kelurahan',
        'tipe_kelurahan',
        'nama_kelurahan',
    ];

    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class);
    }

    public function person(): HasMany
    {
        return $this->hasMany(Person::class);
    }
}
