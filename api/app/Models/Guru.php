<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guru extends Model
{
    use SoftDeletes;

    protected $table = 'guru';

    protected $fillable = [
        'user_id',
        'mgmp_id',
        'nuptk',
        'nrg',
        'nip',
        'gelar_depan',
        'gelar_belakang',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function mgmp(): BelongsTo
    {
        return $this->belongsTo(Mgmp::class, 'mgmp_id');
    }

    public function sekolah(): BelongsToMany
    {
        return $this->belongsToMany(Sekolah::class, 'guru_sekolah', 'guru_id', 'sekolah_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    public function walikelas(): HasMany
    {
        return $this->hasMany(Walikelas::class, 'guru_id');
    }
}
