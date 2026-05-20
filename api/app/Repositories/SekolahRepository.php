<?php

namespace App\Repositories;

use App\Models\Sekolah;
use Illuminate\Database\Eloquent\Collection;

class SekolahRepository
{
    public function all(): Collection
    {
        return Sekolah::all();
    }

    public function findOrFail(int $id): Sekolah
    {
        return Sekolah::findOrFail($id);
    }

    public function create(array $data): Sekolah
    {
        return Sekolah::create($data);
    }

    public function update(Sekolah $sekolah, array $data): Sekolah
    {
        $sekolah->update($data);
        return $sekolah->fresh();
    }

    public function delete(int $id): void
    {
        Sekolah::destroy($id);
    }
}
