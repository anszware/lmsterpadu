<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Provinsi extends Model
{
    protected $table = 'provinsis';
    protected $fillable = [
        'kode_provinsi',
        'nama_provinsi',
    ];

    public function kota(): HasMany
    {
        return $this->hasMany(Kota::class);
    }
    public function person(): HasMany
    {
        return $this->hasMany(Person::class);
    }
}
