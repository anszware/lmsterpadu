<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Siswa extends Model
{
    use SoftDeletes;

    protected $table = 'siswa';

    protected $fillable = [
        'user_id',
        'sekolah_id',
        'nisn',
        'nis',
        'tahun_ajara_id',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class, 'sekolah_id');
    }

    public function tahunAjaran(): BelongsTo
    {
        return $this->belongsTo(TahunAjaran::class, 'tahun_ajara_id');
    }

    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class, 'kelas_siswa', 'siswa_id', 'kelas_sekolah_id')
                    ->withTimestamps();
    }

    public function alumni(): HasOne
    {
        return $this->hasOne(SiswaAlumni::class, 'siswa_id');
    }

    public function pindah(): HasMany
    {
        return $this->hasMany(SiswaPindah::class, 'siswa_id');
    }

    public function keluar(): HasOne
    {
        return $this->hasOne(SiswaKeluar::class, 'siswa_id');
    }
}
