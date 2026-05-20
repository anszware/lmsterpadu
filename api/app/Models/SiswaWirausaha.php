<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaWirausaha extends Model
{
    protected $table = 'siswa_wirausaha';

    protected $fillable = [
        'siswa_alumni_id',
        'nama_usaha',
        'bidang_usaha',
        'deskripsi_usaha',
        'tahun_pendirian',
        'logo_usaha',
        'isActive',
    ];

    protected $casts = [
        'isActive'        => 'boolean',
        'tahun_pendirian' => 'date',
    ];

    public function alumni(): BelongsTo
    {
        return $this->belongsTo(SiswaAlumni::class, 'siswa_alumni_id');
    }
}
