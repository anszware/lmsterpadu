<?php

namespace App\Http\Controllers\Api\V1\MasterData;

use App\Models\Jurusan;
use App\Http\Controllers\Controller;
use App\Http\Resources\MasterData\JurusanResource;
use App\Http\Requests\Api\MasterData\StoreJurusanRequest;
use App\Http\Requests\Api\MasterData\UpdateJurusanRequest;
use Illuminate\Http\JsonResponse;

class JurusanController extends Controller
{
    public function index(): JsonResponse
    {
        $jurusan = Jurusan::paginate(15);
        return JurusanResource::collection($jurusan)->response();
    }

    public function show(Jurusan $jurusan): JsonResponse
    {
        return (new JurusanResource($jurusan))->response();
    }

    public function store(StoreJurusanRequest $request): JsonResponse
    {
        $jurusan = Jurusan::create($request->validated());
        return (new JurusanResource($jurusan))->response();
    }

    public function update(UpdateJurusanRequest $request, Jurusan $jurusan): JsonResponse
    {
        $jurusan->update($request->validated());
        return (new JurusanResource($jurusan->fresh()))->response();
    }

    public function destroy(Jurusan $jurusan): JsonResponse
    {
        $jurusan->delete();
        return response()->json(['message' => 'Jurusan berhasil dihapus.']);
    }
}
