<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaAlumni extends Model
{
    protected $table = 'siswa_alumni';

    protected $fillable = [
        'siswa_id',
        'tahun_lulus',
        'no_ijazah',
        'status_lulus',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function bekerja(): HasMany
    {
        return $this->hasMany(SiswaBekerja::class, 'siswa_alumni_id');
    }

    public function kuliah(): HasMany
    {
        return $this->hasMany(SiswaKuliah::class, 'siswa_alumni_id');
    }

    public function wirausaha(): HasMany
    {
        return $this->hasMany(SiswaWirausaha::class, 'siswa_alumni_id');
    }
}
