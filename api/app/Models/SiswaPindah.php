<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaPindah extends Model
{
    protected $table = 'siswa_pindah';

    protected $fillable = [
        'siswa_id',
        'sekolah_id',
        'sekolah_tujuan',
        'alamat_sekolah',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function sekolahAsal(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class, 'sekolah_id');
    }

    public function sekolahTujuan(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class, 'sekolah_tujuan');
    }
}
