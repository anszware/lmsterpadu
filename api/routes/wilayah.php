<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Wilayah\WilayahController;

/*
|--------------------------------------------------------------------------
| Routes Wilayah
|--------------------------------------------------------------------------
| Semua route di sini READ-ONLY (GET saja).
| Tidak memerlukan middleware 'role:admin' karena data wilayah
| dipakai oleh semua user (form registrasi, form profil, dsb).
|
| Prefix  : /api/v1/wilayah
| Auth    : auth:sanctum (tetap perlu login)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')
     ->prefix('wilayah')
     ->name('wilayah.')
     ->group(function () {

    // ── Provinsi ──────────────────────────────────────────────────────────
    // GET /api/wilayah/provinsi               → list semua provinsi
    // GET /api/wilayah/provinsi?search=jawa   → filter by nama
    // GET /api/wilayah/provinsi?all=true       → tanpa pagination
    Route::get('provinsi',          [WilayahController::class, 'provinsi'])     ->name('provinsi.index');
    Route::get('provinsi/{provinsi}',[WilayahController::class, 'showProvinsi'])->name('provinsi.show');

    // ── Kota / Kabupaten ──────────────────────────────────────────────────
    // GET /api/wilayah/kota?provinsi_id=1
    // GET /api/wilayah/kota?provinsi_id=1&search=bandung
    Route::get('kota',              [WilayahController::class, 'kota'])         ->name('kota.index');
    Route::get('kota/{kota}',       [WilayahController::class, 'showKota'])     ->name('kota.show');

    // ── Kecamatan ─────────────────────────────────────────────────────────
    // GET /api/wilayah/kecamatan?kota_id=1
    Route::get('kecamatan',              [WilayahController::class, 'kecamatan'])     ->name('kecamatan.index');
    Route::get('kecamatan/{kecamatan}',  [WilayahController::class, 'showKecamatan']) ->name('kecamatan.show');

    // ── Kelurahan / Desa ──────────────────────────────────────────────────
    // GET /api/wilayah/kelurahan?kecamatan_id=1
    // GET /api/wilayah/kelurahan?kecamatan_id=1&tipe=Desa
    Route::get('kelurahan',              [WilayahController::class, 'kelurahan'])     ->name('kelurahan.index');
    Route::get('kelurahan/{kelurahan}',  [WilayahController::class, 'showKelurahan']) ->name('kelurahan.show');

    // ── Cascade (helper pre-fill form edit) ───────────────────────────────
    // GET /api/wilayah/cascade?kelurahan_id=9999
    // Response: { provinsi, kota, kecamatan, kelurahan } sekaligus
    Route::get('cascade', [WilayahController::class, 'cascade'])->name('cascade');
});
