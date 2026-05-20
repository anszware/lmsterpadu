<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MataPelajaran extends Model
{
    protected $table = 'mata_pelajaran';

    protected $fillable = [
        'mgmp_id',
        'nama_mata_pelajaran',
        'tingkat_sekolah',
        'deskripsi',
    ];

    public function mgmp(): BelongsTo
    {
        return $this->belongsTo(Mgmp::class, 'mgmp_id');
    }
}
