<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    /**
     * Kolom yang dapat diisi secara massal.
     */
    protected $table = 'role';
    protected $fillable = [
        'name',
        'display_name',
        'description',
    ];

    /**
     * Relasi One-to-Many: Satu Role dimiliki oleh banyak User.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
