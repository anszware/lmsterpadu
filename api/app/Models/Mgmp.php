<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mgmp extends Model
{
    protected $table = 'mgmp';

    protected $fillable = [
        'nama_mgmp',
        'jenjang',
        'deskripsi',
    ];

    public function guru(): HasMany
    {
        return $this->hasMany(Guru::class, 'mgmp_id');
    }

    public function mataPelajaran(): HasMany
    {
        return $this->hasMany(MataPelajaran::class, 'mgmp_id');
    }
}
