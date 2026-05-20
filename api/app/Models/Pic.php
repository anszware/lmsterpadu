<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pic extends Model
{
    use SoftDeletes;

    protected $table = 'pic';

    protected $fillable = [
        'user_id',
        'sekolah_id',
        'status',
    ];

   
    // Relasi ke User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relasi ke Sekolah
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class, 'sekolah_id');
    }

    // Scope: hanya PIC yang aktif
    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }
}
