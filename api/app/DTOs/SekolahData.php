<?php

namespace App\DTOs;

readonly class SekolahData
{
    public function __construct(
        public string $nama,
        public string $npsn,
        public ?string $alamat,
        public string $status,
        public int $kotaId,
    ) {}

    public function toArray(): array
    {
        return [
            'nama'     => $this->nama,
            'npsn'     => $this->npsn,
            'alamat'   => $this->alamat,
            'status'   => $this->status,
            'kota_id'  => $this->kotaId,
        ];
    }

    public static function fromRequest(array $validated): self
    {
        return new self(
            nama:    $validated['nama'],
            npsn:    $validated['npsn'],
            alamat:  $validated['alamat'] ?? null,
            status:  $validated['status'],
            kotaId:  $validated['kota_id'],
        );
    }
}
