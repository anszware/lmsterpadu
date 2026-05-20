<?php

namespace App\Http\Controllers\Api\V1\Wilayah;

use App\Models\Kota;
use App\Models\Provinsi;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Http\Controllers\Controller;
use App\Http\Resources\Wilayah\ProvinsiResource;
use App\Http\Resources\Wilayah\KotaResource;
use App\Http\Resources\Wilayah\KecamatanResource;
use App\Http\Resources\Wilayah\KelurahanResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WilayahController extends Controller
{
    // ── PROVINSI ─────────────────────────────────────────────────────────────

    /**
     * GET /api/v1/wilayah/provinsi
     * List semua provinsi, bisa di-search by nama.
     */
    public function provinsi(Request $request): JsonResponse
    {
        $query = Provinsi::query()->orderBy('nama_provinsi');

        if ($request->filled('search')) {
            $query->where('nama_provinsi', 'like', '%' . $request->search . '%');
        }

        $provinsi = $request->boolean('all')
            ? $query->get()
            : $query->paginate($request->integer('per_page', 34));

        return ProvinsiResource::collection($provinsi)->response();
    }

    /**
     * GET /api/v1/wilayah/provinsi/{id}
     * Detail satu provinsi.
     */
    public function showProvinsi(Provinsi $provinsi): JsonResponse
    {
        return (new ProvinsiResource($provinsi))->response();
    }

    // ── KOTA / KABUPATEN ──────────────────────────────────────────────────────

    /**
     * GET /api/v1/wilayah/kota?provinsi_id=1
     * List kota/kabupaten berdasarkan provinsi.
     */
    public function kota(Request $request): JsonResponse
    {
        $request->validate([
            'provinsi_id' => ['required', 'integer', 'exists:provinsis,id'],
            'search'      => ['nullable', 'string', 'max:100'],
        ]);

        $query = Kota::where('provinsi_id', $request->provinsi_id)
                     ->orderBy('nama_kota');

        if ($request->filled('search')) {
            $query->where('nama_kota', 'like', '%' . $request->search . '%');
        }

        $kota = $request->boolean('all')
            ? $query->get()
            : $query->paginate($request->integer('per_page', 20));

        return KotaResource::collection($kota)->response();
    }

    /**
     * GET /api/v1/wilayah/kota/{id}
     * Detail satu kota/kabupaten.
     */
    public function showKota(Kota $kota): JsonResponse
    {
        $kota->load('provinsi');
        return (new KotaResource($kota))->response();
    }

    // ── KECAMATAN ─────────────────────────────────────────────────────────────

    /**
     * GET /api/v1/wilayah/kecamatan?kota_id=1
     * List kecamatan berdasarkan kota/kabupaten.
     */
    public function kecamatan(Request $request): JsonResponse
    {
        $request->validate([
            'kota_id' => ['required', 'integer', 'exists:kotas,id'],
            'search'  => ['nullable', 'string', 'max:100'],
        ]);

        $query = Kecamatan::where('kota_id', $request->kota_id)
                          ->orderBy('nama_kecamatan');

        if ($request->filled('search')) {
            $query->where('nama_kecamatan', 'like', '%' . $request->search . '%');
        }

        $kecamatan = $request->boolean('all')
            ? $query->get()
            : $query->paginate($request->integer('per_page', 20));

        return KecamatanResource::collection($kecamatan)->response();
    }

    /**
     * GET /api/v1/wilayah/kecamatan/{id}
     * Detail satu kecamatan.
     */
    public function showKecamatan(Kecamatan $kecamatan): JsonResponse
    {
        $kecamatan->load('kota.provinsi');
        return (new KecamatanResource($kecamatan))->response();
    }

    // ── KELURAHAN / DESA ──────────────────────────────────────────────────────

    /**
     * GET /api/v1/wilayah/kelurahan?kecamatan_id=1
     * List kelurahan/desa berdasarkan kecamatan.
     */
    public function kelurahan(Request $request): JsonResponse
    {
        $request->validate([
            'kecamatan_id' => ['required', 'integer', 'exists:kecamatans,id'],
            'search'       => ['nullable', 'string', 'max:100'],
            'tipe'         => ['nullable', 'in:Kelurahan,Desa'],
        ]);

        $query = Kelurahan::where('kecamatan_id', $request->kecamatan_id)
                          ->orderBy('nama_kelurahan');

        if ($request->filled('search')) {
            $query->where('nama_kelurahan', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('tipe')) {
            $query->where('tipe_kelurahan', $request->tipe);
        }

        $kelurahan = $request->boolean('all')
            ? $query->get()
            : $query->paginate($request->integer('per_page', 20));

        return KelurahanResource::collection($kelurahan)->response();
    }

    /**
     * GET /api/v1/wilayah/kelurahan/{id}
     * Detail satu kelurahan/desa.
     */
    public function showKelurahan(Kelurahan $kelurahan): JsonResponse
    {
        $kelurahan->load('kecamatan.kota.provinsi');
        return (new KelurahanResource($kelurahan))->response();
    }

    // ── CASCADING DROPDOWN (helper khusus frontend) ───────────────────────────

    /**
     * GET /api/v1/wilayah/cascade?kode_wilayah=32.01.01.1001
     * Resolve satu kode wilayah lengkap sekaligus.
     * Berguna untuk pre-fill form edit.
     */
    public function cascade(Request $request): JsonResponse
    {
        $request->validate([
            'kelurahan_id' => ['required', 'integer', 'exists:kelurahans,id'],
        ]);

        $kelurahan = Kelurahan::with('kecamatan.kota.provinsi')
                              ->findOrFail($request->kelurahan_id);

        return response()->json([
            'data' => [
                'provinsi'  => new ProvinsiResource($kelurahan->kecamatan->kota->provinsi),
                'kota'      => new KotaResource($kelurahan->kecamatan->kota),
                'kecamatan' => new KecamatanResource($kelurahan->kecamatan),
                'kelurahan' => new KelurahanResource($kelurahan),
            ],
        ]);
    }
}
