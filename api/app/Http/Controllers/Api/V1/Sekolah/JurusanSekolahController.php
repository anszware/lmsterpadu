<?php

namespace App\Http\Controllers\Api\V1\Sekolah;

use App\Models\Jurusan;
use App\Models\Sekolah;
use App\Http\Controllers\Controller;
use App\Http\Resources\MasterData\JurusanResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JurusanSekolahController extends Controller
{
    protected function getSekolah(Request $request): Sekolah
    {
        $pic = $request->user()->pic()->aktif()->firstOrFail();
        return $pic->sekolah;
    }

    public function index(Request $request): JsonResponse
    {
        $sekolah = $this->getSekolah($request);
        $jurusan = $sekolah->jurusan()->paginate(15);
        return JurusanResource::collection($jurusan)->response();
    }

    public function available(Request $request): JsonResponse
    {
        $sekolah = $this->getSekolah($request);
        $assignedIds = $sekolah->jurusan()->pluck('jurusan.id');

        $jurusan = Jurusan::whereNotIn('id', $assignedIds)->paginate(15);
        return JurusanResource::collection($jurusan)->response();
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'jurusan_id' => ['required', 'integer', 'exists:jurusan,id'],
        ]);

        $sekolah = $this->getSekolah($request);

        if ($sekolah->jurusan()->where('jurusan_id', $request->jurusan_id)->exists()) {
            return response()->json([
                'message' => 'Jurusan sudah terdaftar di sekolah ini.',
            ], 409);
        }

        $sekolah->jurusan()->attach($request->jurusan_id);

        return response()->json([
            'message' => 'Jurusan berhasil ditambahkan ke sekolah.',
        ], 201);
    }

    public function destroy(Request $request, Jurusan $jurusan): JsonResponse
    {
        $sekolah = $this->getSekolah($request);

        if (!$sekolah->jurusan()->where('jurusan_id', $jurusan->id)->exists()) {
            return response()->json([
                'message' => 'Jurusan tidak terdaftar di sekolah ini.',
            ], 404);
        }

        $sekolah->jurusan()->detach($jurusan->id);

        return response()->json([
            'message' => 'Jurusan berhasil dihapus dari sekolah.',
        ]);
    }
}
