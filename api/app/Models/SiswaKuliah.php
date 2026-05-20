<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaKuliah extends Model
{
    protected $table = 'siswa_kuliah';

    protected $fillable = [
        'siswa_alumni_id',
        'nama_universitas',
        'fakultas',
        'tahun_masuk',
        'isActive',
        'logo_universitas',
    ];

    protected $casts = [
        'isActive' => 'boolean',
    ];

    public function alumni(): BelongsTo
    {
        return $this->belongsTo(SiswaAlumni::class, 'siswa_alumni_id');
    }
}
