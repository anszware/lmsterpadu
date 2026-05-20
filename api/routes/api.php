<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\PasswordResetController;
use App\Http\Controllers\Api\V1\User\UserController;
use App\Http\Controllers\Api\V1\User\GuruController;
use App\Http\Controllers\Api\V1\User\PicController;
use App\Http\Controllers\Api\V1\User\SiswaController;
use App\Http\Controllers\Api\V1\MasterData\JurusanController;
use App\Http\Controllers\Api\V1\Sekolah\JurusanSekolahController;
use App\Http\Controllers\Api\V1\Sekolah\KelasController;
use App\Http\Controllers\Api\V1\Sekolah\MataPelajaranController;
use App\Http\Controllers\Api\V1\Sekolah\SekolahController;

// Public Route
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [PasswordResetController::class, 'forgotPassword']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);

// Protected Routes (Harus Login)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Contoh Route Khusus Admin
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('user', UserController::class);
        Route::get('users', [UserController::class, 'index']);
        Route::apiResource('user/pic', PicController::class);
        Route::apiResource('user/guru', GuruController::class);
        Route::apiResource('jurusan', JurusanController::class);
        Route::apiResource('siswa', SiswaController::class);
        Route::post('siswa/import', [SiswaController::class, 'importCsv']);
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/roles', function () {
            return response()->json(\App\Models\Role::all(['id', 'name', 'display_name']));
        });
        Route::get('/sekolah-list', function () {
            return response()->json(\App\Models\Sekolah::all(['id', 'npsn', 'nama_sekolah']));
        });
        Route::get('/mgmp-list', function () {
            return response()->json(\App\Models\Mgmp::all(['id', 'nama_mgmp']));
        });
    });

    // Contoh Route Khusus Guru & Admin
    Route::middleware('role:guru')->prefix('guru')->group(function () {
        Route::get('/courses', function () {
            return response()->json(['message' => 'Daftar Materi LMS']);
        });
    });

    // Contoh Route Khusus Siswa
    Route::middleware('role:siswa')->prefix('siswa')->group(function () {
        Route::get('/my-grades', function () {
            return response()->json(['message' => 'Nilai Saya']);
        });
    });

    // Contoh Route Khusus PIC
    Route::middleware('role:pic')->prefix('sekolah')->group(function () {
        Route::get('/my-grades', function () {
            return response()->json(['message' => 'Nilai Saya']);
        });
        Route::get('/jurusan/available', [JurusanSekolahController::class, 'available']);
        Route::get('/jurusan', [JurusanSekolahController::class, 'index']);
        Route::post('/jurusan', [JurusanSekolahController::class, 'store']);
        Route::delete('/jurusan/{jurusan}', [JurusanSekolahController::class, 'destroy']);
        Route::apiResource('siswa', SiswaController::class);
        Route::post('siswa/import', [SiswaController::class, 'importCsv']);
    });
});

require __DIR__ . '/wilayah.php';
