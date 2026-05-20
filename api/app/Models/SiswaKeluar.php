<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaKeluar extends Model
{
    protected $table = 'siswa_keluar';

    protected $fillable = [
        'siswa_id',
        'sekolah_id',
        'tanggal_keluar',
        'jenis_keluar',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_keluar' => 'date',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class, 'sekolah_id');
    }
}
