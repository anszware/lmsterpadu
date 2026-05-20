<?php

namespace App\Services;

use App\Models\Sekolah;
use App\DTOs\SekolahData;
use App\Repositories\SekolahRepository;
use Illuminate\Support\Facades\DB;

class SekolahService
{
    public function __construct(
        private SekolahRepository $repository
    ) {}

    public function createSekolah(SekolahData $data): Sekolah
    {
        return DB::transaction(function () use ($data) {
            return $this->repository->create($data->toArray());
        });
    }

    public function updateSekolah(int $id, SekolahData $data): Sekolah
    {
        return DB::transaction(function () use ($id, $data) {
            $sekolah = $this->repository->findOrFail($id);
            return $this->repository->update($sekolah, $data->toArray());
        });
    }

    public function deleteSekolah(int $id): void
    {
        DB::transaction(function () use ($id) {
            $this->repository->delete($id);
        });
    }
}
