<?php

namespace App\Http\Controllers\Api\V1\Sekolah;

use App\Models\Guru;
use App\Models\Sekolah;
use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\GuruResource;
use App\Http\Requests\Api\User\StoreGuruRequest;
use App\Http\Requests\Api\User\UpdateGuruRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $sekolahId = $request->user()->sekolah_id;
        
        $guru = Guru::whereHas('sekolah', function($query) use ($sekolahId) {
            $query->where('sekolah_id', $sekolahId);
        })->with(['user.person', 'mgmp', 'sekolah' => function($query) use ($sekolahId) {
            $query->where('sekolah_id', $sekolahId);
        }])->paginate(15);

        return GuruResource::collection($guru)->response();
    }

    public function store(StoreGuruRequest $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $sekolahId = $request->user()->sekolah_id;

            // STEP 1 — Simpan ke tabel users
            $user = User::create([
                'username' => $request->username,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'role_id'  => Role::where('name', 'guru')->value('id'),
                'sekolah_id' => $sekolahId // Default sekolah
            ]);

            // STEP 2 — Handle upload foto jika ada
            $fotoPath = null;
            if ($request->hasFile('foto')) {
                $fotoPath = $request->file('foto')->store('foto/person', 'public');
            }

            // STEP 3 — Simpan ke tabel people
            $user->person()->create([
                'nik'          => $request->nik,
                'full_name'    => $request->full_name,
                'gender'       => $request->gender,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'alamat'       => $request->alamat,
                'provinsi_id'  => $request->provinsi_id,
                'kota_id'      => $request->kota_id,
                'kecamatan_id' => $request->kecamatan_id,
                'kelurahan_id' => $request->kelurahan_id,
                'rt'           => $request->rt,
                'rw'           => $request->rw,
                'no_hp'       => $request->no_hp,
                'foto'        => $fotoPath,
            ]);

            // STEP 4 — Simpan ke tabel guru
            $guru = Guru::create([
                'user_id'        => $user->id,
                'mgmp_id'        => $request->mgmp_id,
                'nuptk'          => $request->nuptk,
                'nrg'            => $request->nrg,
                'nip'            => $request->nip,
                'gelar_depan'    => $request->gelar_depan,
                'gelar_belakang' => $request->gelar_belakang,
            ]);

            // STEP 5 — Simpan ke pivot tabel guru_sekolah
            $guru->sekolah()->attach($sekolahId, [
                'status' => $request->status_guru,
            ]);

            DB::commit();
            $guru->load(['user.person', 'mgmp', 'sekolah']);
            return (new GuruResource($guru))->response();
        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($fotoPath) && $fotoPath) {
                Storage::disk('public')->delete($fotoPath);
            }
            return response()->json(['message' => 'Gagal menambahkan data guru.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        $sekolahId = $request->user()->sekolah_id;
        $guru = Guru::whereHas('sekolah', function($query) use ($sekolahId) {
            $query->where('sekolah_id', $sekolahId);
        })->with(['user.person', 'mgmp', 'sekolah' => function($query) use ($sekolahId) {
            $query->where('sekolah_id', $sekolahId);
        }])->findOrFail($id);

        return (new GuruResource($guru))->response();
    }

    public function update(UpdateGuruRequest $request, $id): JsonResponse
    {
        $sekolahId = $request->user()->sekolah_id;
        $guru = Guru::whereHas('sekolah', function($query) use ($sekolahId) {
            $query->where('sekolah_id', $sekolahId);
        })->findOrFail($id);

        DB::beginTransaction();
        try {
            $userData = [
                'username' => $request->username,
                'email'    => $request->email,
            ];
            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }
            $guru->user->update($userData);

            $personData = $request->only([
                'nik', 'full_name', 'gender', 'tempat_lahir', 'tanggal_lahir',
                'alamat', 'provinsi_id', 'kota_id', 'kecamatan_id', 'kelurahan_id',
                'rt', 'rw', 'no_hp',
            ]);
            if ($request->hasFile('foto')) {
                $personData['foto'] = $request->file('foto')->store('foto/person', 'public');
            }
            if ($guru->user->person) {
                $guru->user->person->update($personData);
            }

            $guru->update($request->only([
                'mgmp_id', 'nuptk', 'nrg', 'nip', 'gelar_depan', 'gelar_belakang',
            ]));

            $guru->sekolah()->updateExistingPivot($sekolahId, ['status' => $request->status_guru]);

            DB::commit();
            $guru->load(['user.person', 'mgmp', 'sekolah']);
            return (new GuruResource($guru))->response();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal mengupdate data guru.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $sekolahId = $request->user()->sekolah_id;
        $guru = Guru::whereHas('sekolah', function($query) use ($sekolahId) {
            $query->where('sekolah_id', $sekolahId);
        })->findOrFail($id);

        // Detach instead of Delete
        $guru->sekolah()->detach($sekolahId);

        return response()->json(['message' => 'Guru berhasil dilepaskan dari sekolah ini.']);
    }
}
