<?php

namespace App\Http\Controllers\Api\V1\Sekolah;

use App\Models\Sekolah;
use App\Models\User;
use App\Models\Role;
use App\Models\Pic;
use App\Http\Controllers\Controller;
use App\Http\Resources\Sekolah\SekolahResource;
use App\Http\Requests\Api\Sekolah\StoreSekolahRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class SekolahController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $search = $request->query('search');

        $sekolah = Sekolah::with(['provinsi', 'kota', 'kecamatan', 'kelurahan'])
            ->when($search, function ($query) use ($search) {
                $query->where('nama_sekolah', 'like', "%{$search}%")
                      ->orWhere('npsn', 'like', "%{$search}%");
            })
            ->paginate(15);

        return SekolahResource::collection($sekolah)->response();
    }

    public function store(StoreSekolahRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            // 1. Create Sekolah
            $sekolahData = $request->only([
                'npsn', 'nama_sekolah', 'alamat_sekolah', 'provinsi_id', 'kota_id',
                'kecamatan_id', 'kelurahan_id', 'rt', 'rw', 'tlp_sekolah', 'email_sekolah',
                'jenjang', 'jenis_sekolah'
            ]);

            if ($request->hasFile('logo_sekolah')) {
                $sekolahData['logo_sekolah'] = $request->file('logo_sekolah')->store('logos', 'public');
            }

            $sekolah = Sekolah::create($sekolahData);

            // 2. Create User for PIC
            $user = User::create([
                'username' => $request->pic_username,
                'email'    => $request->pic_email,
                'password' => Hash::make($request->pic_password),
                'role_id'  => Role::where('name', 'pic')->value('id'),
                'sekolah_id' => $sekolah->id, // Optional linkage in user table
            ]);

            // 3. Create Person for PIC
            $personData = [
                'nik'           => $request->pic_nik,
                'full_name'     => $request->pic_full_name,
                'gender'        => $request->pic_gender,
                'no_hp'         => $request->pic_no_hp,
                'tempat_lahir'  => $request->pic_tempat_lahir,
                'tanggal_lahir' => $request->pic_tanggal_lahir,
                'alamat'        => $request->pic_alamat,
                // Inherit wilayah from sekolah if same, or use specific ones if provided (form used pic_alamat)
                'provinsi_id'   => $request->provinsi_id,
                'kota_id'       => $request->kota_id,
                'kecamatan_id'  => $request->kecamatan_id,
                'kelurahan_id'  => $request->kelurahan_id,
                'rt'            => $request->rt,
                'rw'            => $request->rw,
            ];

            if ($request->hasFile('pic_foto')) {
                $personData['foto'] = $request->file('pic_foto')->store('photos', 'public');
            }

            $user->person()->create($personData);

            // 4. Create PIC Link
            Pic::create([
                'user_id'    => $user->id,
                'sekolah_id' => $sekolah->id,
                'status'     => 'aktif',
            ]);

            $sekolah->load(['provinsi', 'kota', 'kecamatan', 'kelurahan', 'pic.user.person']);
            return (new SekolahResource($sekolah))->response();
        });
    }

    public function show(Sekolah $sekolah): JsonResponse
    {
        $sekolah->load(['provinsi', 'kota', 'kecamatan', 'kelurahan', 'pic.user.person']);
        return (new SekolahResource($sekolah))->response();
    }

    public function destroy(Sekolah $sekolah): JsonResponse
    {
        if ($sekolah->logo_sekolah) {
            Storage::disk('public')->delete($sekolah->logo_sekolah);
        }
        
        // Note: CASCADE on database handles pic and children usually, 
        // but PIC users might need manual cleanup if not desired to keep them.
        $sekolah->delete();
        
        return response()->json(['message' => 'Data sekolah berhasil dihapus.']);
    }
}
