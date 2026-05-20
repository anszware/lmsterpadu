<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Guru;
use App\Models\Pic;
use App\Models\Siswa;
use App\Models\Sekolah;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'total_users'   => User::count(),
            'total_guru'    => Guru::count(),
            'total_pic'     => Pic::count(),
            'total_siswa'   => Siswa::count(),
            'total_sekolah' => Sekolah::count(),
        ]);
    }
}
