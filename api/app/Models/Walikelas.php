<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Walikelas extends Model
{
    protected $table = 'walikelas';

    protected $fillable = [
        'kelas_id',
        'guru_id',
        'isActive',
    ];

    protected $casts = [
        'isActive' => 'boolean',
    ];

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function guru(): BelongsTo
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }
}
