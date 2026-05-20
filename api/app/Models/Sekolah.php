<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sekolah extends Model
{
    use SoftDeletes;

    protected $table = 'sekolah';

    protected $fillable = [
        'npsn',
        'nama_sekolah',
        'alamat_sekolah',
        'provinsi_id',
        'kota_id',
        'kecamatan_id',
        'kelurahan_id',
        'rt',
        'rw',
        'tlp_sekolah',
        'email_sekolah',
        'logo_sekolah',
        'jenjang',
        'jenis_sekolah',
    ];

    protected $appends = ['alamat_lengkap'];

    public function getAlamatLengkapAttribute(): string
    {
        $addressParts = [];

        if ($this->alamat_sekolah) {
            $addressParts[] = $this->alamat_sekolah;
        }

        if ($this->rt) {
            $addressParts[] = "RT. " . $this->rt;
        }

        if ($this->rw) {
            $addressParts[] = "RW. " . $this->rw;
        }

        if ($this->kelurahan) {
            $addressParts[] = $this->kelurahan->nama_kelurahan;
        }

        if ($this->kecamatan) {
            $addressParts[] = $this->kecamatan->nama_kecamatan;
        }

        if ($this->kota) {
            $addressParts[] = $this->kota->nama_kota;
        }

        if ($this->provinsi) {
            $addressParts[] = $this->provinsi->nama_provinsi;
        }

        return implode(', ', $addressParts);
    }

    // ── Relasi ke wilayah ────────────────────────────────────────────────────
    public function provinsi(): BelongsTo
    {
        return $this->belongsTo(Provinsi::class, 'provinsi_id');
    }

    public function kota(): BelongsTo
    {
        return $this->belongsTo(Kota::class, 'kota_id');
    }

    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class, 'kecamatan_id');
    }

    public function kelurahan(): BelongsTo
    {
        return $this->belongsTo(Kelurahan::class, 'kelurahan_id');
    }

    // ── Relasi ke entitas sekolah ────────────────────────────────────────────
    public function siswa(): HasMany
    {
        return $this->hasMany(Siswa::class, 'sekolah_id');
    }

    public function kelas(): HasMany
    {
        return $this->hasMany(Kelas::class, 'sekolah_id');
    }

    public function siswaKeluar(): HasMany
    {
        return $this->hasMany(SiswaKeluar::class, 'sekolah_id');
    }

    public function siswaPindah(): HasMany
    {
        return $this->hasMany(SiswaPindah::class, 'sekolah_id');
    }

    public function guru(): BelongsToMany
    {
        return $this->belongsToMany(Guru::class, 'guru_sekolah', 'sekolah_id', 'guru_id')
            ->withPivot('status')
            ->withTimestamps();
    }

    public function pic(): HasMany
    {
        return $this->hasMany(Pic::class, 'sekolah_id');
    }

    public function jurusan(): BelongsToMany
    {
        return $this->belongsToMany(Jurusan::class, 'jurusan_sekolah', 'sekolah_id', 'jurusan_id')
            ->withTimestamps();
    }
}
