<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Models\Pic;
use App\Models\Sekolah;
use App\Models\Person;
use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\PicResource;
use App\Http\Requests\Api\User\StorePicRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class PicController extends Controller
{
    public function index(): JsonResponse
    {
        $pic = Pic::with(['user.person', 'sekolah'])->paginate(15);
        return PicResource::collection($pic)->response();
    }

    public function show(Pic $pic): JsonResponse
    {
        $pic->load(['user.person.provinsi', 'user.person.kota', 'user.person.kecamatan', 'user.person.kelurahan', 'sekolah']);
        return (new PicResource($pic))->response();
    }

    public function store(StorePicRequest $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            // STEP 1 — Simpan ke tabel sekolah
            $sekolah = Sekolah::create([
                'npsn'           => $request->npsn,
                'nama_sekolah'   => $request->nama_sekolah,
                'alamat_sekolah' => $request->alamat_sekolah,
                'provinsi_id'    => $request->provinsi_id_sekolah,
                'kota_id'        => $request->kota_id_sekolah,
                'kecamatan_id'   => $request->kecamatan_id_sekolah,
                'kelurahan_id'   => $request->kelurahan_id_sekolah,
                'rt'             => $request->rt_sekolah,
                'rw'             => $request->rw_sekolah,
                'tlp_sekolah'    => $request->tlp_sekolah,
                'email_sekolah'  => $request->email_sekolah,
                'jenjang'        => $request->jenjang,
                'jenis_sekolah'  => $request->jenis_sekolah,
            ]);

            // STEP 2 — Simpan ke tabel users
            $user = User::create([
                'username'   => $request->username,
                'email'      => $request->email,
                'password'   => Hash::make($request->password),
                'role_id'    => Role::where('name', 'pic')->value('id'),
                'sekolah_id' => $sekolah->id,
            ]);

            // STEP 3 — Handle upload foto jika ada
            $fotoPath = null;
            if ($request->hasFile('foto')) {
                $fotoPath = $request->file('foto')->store('foto/person', 'public');
            }

            // STEP 4 — Simpan ke tabel people
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
                'no_hp'        => $request->no_hp,
                'foto'         => $fotoPath,
            ]);

            // STEP 5 — Simpan ke tabel pic
            $pic = Pic::create([
                'user_id'    => $user->id,
                'sekolah_id' => $sekolah->id,
                'status'     => $request->status_pic,
            ]);

            DB::commit();

            $pic->load(['user.person.provinsi', 'user.person.kota', 'user.person.kecamatan', 'user.person.kelurahan', 'sekolah']);
            return (new PicResource($pic))->response();
        } catch (\Exception $e) {
            DB::rollBack();

            if (isset($fotoPath) && $fotoPath) {
                Storage::disk('public')->delete($fotoPath);
            }

            return response()->json([
                'message' => 'Gagal menambahkan data PIC.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function update(StorePicRequest $request, Pic $pic): JsonResponse
    {
        DB::beginTransaction();
        try {
            // Update data sekolah
            $pic->sekolah->update([
                'npsn'           => $request->npsn,
                'nama_sekolah'   => $request->nama_sekolah,
                'alamat_sekolah' => $request->alamat_sekolah,
                'provinsi_id'    => $request->provinsi_id_sekolah,
                'kota_id'        => $request->kota_id_sekolah,
                'kecamatan_id'   => $request->kecamatan_id_sekolah,
                'kelurahan_id'   => $request->kelurahan_id_sekolah,
                'rt'             => $request->rt_sekolah,
                'rw'             => $request->rw_sekolah,
                'tlp_sekolah'    => $request->tlp_sekolah,
                'email_sekolah'  => $request->email_sekolah,
                'jenjang'        => $request->jenjang,
                'jenis_sekolah'  => $request->jenis_sekolah,
            ]);

            // Update data user
            $userData = [
                'username' => $request->username,
                'email'    => $request->email,
            ];
            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }
            $pic->user->update($userData);

            // Handle foto
            $fotoPath = null;
            if ($request->hasFile('foto')) {
                if ($pic->user->person->foto) {
                    Storage::disk('public')->delete($pic->user->person->foto);
                }
                $fotoPath = $request->file('foto')->store('foto/person', 'public');
            }

            // Update data person
            $personData = [
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
                'no_hp'        => $request->no_hp,
            ];
            if ($fotoPath) {
                $personData['foto'] = $fotoPath;
            }
            $pic->user->person->update($personData);

            // Update status pic
            $pic->update([
                'status' => $request->status_pic,
            ]);

            DB::commit();

            $pic->load(['user.person.provinsi', 'user.person.kota', 'user.person.kecamatan', 'user.person.kelurahan', 'sekolah']);
            return (new PicResource($pic))->response();
        } catch (\Exception $e) {
            DB::rollBack();

            if (isset($fotoPath) && $fotoPath) {
                Storage::disk('public')->delete($fotoPath);
            }

            return response()->json([
                'message' => 'Gagal memperbarui data PIC.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Pic $pic): JsonResponse
    {
        $pic->user->person->delete();
        $pic->user->delete();
        $pic->delete();
        return response()->json(['message' => 'Data PIC berhasil dihapus.']);
    }
}
