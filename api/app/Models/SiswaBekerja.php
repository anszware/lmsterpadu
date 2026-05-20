<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaBekerja extends Model
{
    protected $table = 'siswa_bekerja';

    protected $fillable = [
        'siswa_alumni_id',
        'nama_instansi',
        'divisi',
        'tahun_masuk',
        'deskripsi_instansi',
        'logo_instansi',
        'isActive',
    ];

    protected $casts = [
        'isActive' => 'boolean',
    ];

    public function alumni(): BelongsTo
    {
        return $this->belongsTo(SiswaAlumni::class, 'siswa_alumni_id');
    }
}
