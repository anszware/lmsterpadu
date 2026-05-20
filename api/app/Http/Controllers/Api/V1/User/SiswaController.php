<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Models\Siswa;
use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\SiswaResource;
use App\Http\Requests\Api\User\StoreSiswaRequest;
use App\Http\Requests\Api\User\ImportSiswaRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SiswaController extends Controller
{
    private const CSV_HEADERS = [
        'email', 'username', 'password', 'nisn', 'nis',
        'full_name', 'nik', 'gender', 'tempat_lahir', 'tanggal_lahir',
        'alamat', 'no_hp', 'tahun_ajara_id', 'kelas_id', 'status',
    ];

    protected function getSekolahId(Request $request): int
    {
        if ($request->user()->role->name === 'pic') {
            $pic = $request->user()->pic()->aktif()->firstOrFail();
            return $pic->sekolah_id;
        }
        return $request->sekolah_id;
    }

    public function index(Request $request): JsonResponse
    {
        $query = Siswa::with(['user.person', 'sekolah', 'tahunAjaran', 'kelas']);

        if ($request->user()->role->name === 'pic') {
            $pic = $request->user()->pic()->aktif()->firstOrFail();
            $query->where('sekolah_id', $pic->sekolah_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user.person', function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%");
            })->orWhere('nisn', 'like', "%{$search}%");
        }

        if ($request->filled('kelas_id')) {
            $query->whereHas('kelas', function ($q) use ($request) {
                $q->where('kelas.id', $request->kelas_id);
            });
        }

        $siswa = $query->paginate(15);
        return SiswaResource::collection($siswa)->response();
    }

    public function show(Siswa $siswa): JsonResponse
    {
        $siswa->load(['user.person.provinsi', 'user.person.kota', 'user.person.kecamatan', 'user.person.kelurahan', 'sekolah', 'tahunAjaran', 'kelas.jurusan']);
        return (new SiswaResource($siswa))->response();
    }

    public function store(StoreSiswaRequest $request): JsonResponse
    {
        $sekolahId = $this->getSekolahId($request);

        DB::beginTransaction();
        try {
            $user = User::create([
                'username'   => $request->username,
                'email'      => $request->email,
                'password'   => Hash::make($request->password),
                'role_id'    => Role::where('name', 'siswa')->value('id'),
                'sekolah_id' => $sekolahId,
            ]);

            $fotoPath = null;
            if ($request->hasFile('foto')) {
                $fotoPath = $request->file('foto')->store('foto/siswa', 'public');
            }

            $user->person()->create([
                'nik'          => $request->nik,
                'full_name'    => $request->full_name,
                'gender'       => $request->gender,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'alamat'       => $request->alamat,
                'no_hp'        => $request->no_hp,
                'foto'         => $fotoPath,
            ]);

            $siswa = Siswa::create([
                'user_id'       => $user->id,
                'sekolah_id'    => $sekolahId,
                'nisn'          => $request->nisn,
                'nis'           => $request->nis,
                'tahun_ajara_id' => $request->tahun_ajara_id,
                'status'        => $request->status,
            ]);

            $siswa->kelas()->attach($request->kelas_id);

            DB::commit();

            $siswa->load(['user.person', 'sekolah', 'tahunAjaran', 'kelas']);
            return (new SiswaResource($siswa))->response();
        } catch (\Exception $e) {
            DB::rollBack();

            if (isset($fotoPath) && $fotoPath) {
                Storage::disk('public')->delete($fotoPath);
            }

            return response()->json([
                'message' => 'Gagal menambahkan data siswa.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, Siswa $siswa): JsonResponse
    {
        $request->validate([
            'username'       => ['nullable', 'string', 'max:255', 'unique:users,username,' . $siswa->user_id],
            'email'          => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $siswa->user_id],
            'password'       => ['nullable', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['nullable', 'string', 'min:8'],
            'nik'            => ['required', 'numeric', 'digits:16', 'unique:people,nik,' . $siswa->user->person?->id],
            'full_name'      => ['required', 'string', 'max:255'],
            'gender'         => ['required', 'in:L,P'],
            'tempat_lahir'   => ['required', 'string', 'max:255'],
            'tanggal_lahir'  => ['required', 'date', 'before:today'],
            'alamat'         => ['required', 'string', 'max:500'],
            'no_hp'          => ['required', 'string', 'max:16'],
            'foto'           => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'nisn'           => ['required', 'string', 'max:20', 'unique:siswa,nisn,' . $siswa->id],
            'nis'            => ['nullable', 'string', 'max:20'],
            'tahun_ajara_id' => ['required', 'integer', 'exists:tahun_ajaran,id'],
            'kelas_id'       => ['required', 'integer', 'exists:kelas,id'],
            'status'         => ['required', 'in:aktif,alumni,pindah,keluar'],
        ]);

        DB::beginTransaction();
        try {
            $userData = [
                'username' => $request->username,
                'email'    => $request->email,
            ];
            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }
            $siswa->user->update($userData);

            $fotoPath = null;
            if ($request->hasFile('foto')) {
                if ($siswa->user->person->foto) {
                    Storage::disk('public')->delete($siswa->user->person->foto);
                }
                $fotoPath = $request->file('foto')->store('foto/siswa', 'public');
            }

            $personData = [
                'nik'          => $request->nik,
                'full_name'    => $request->full_name,
                'gender'       => $request->gender,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'alamat'       => $request->alamat,
                'no_hp'        => $request->no_hp,
            ];
            if ($fotoPath) {
                $personData['foto'] = $fotoPath;
            }
            $siswa->user->person->update($personData);

            $siswa->update([
                'nisn'          => $request->nisn,
                'nis'           => $request->nis,
                'tahun_ajara_id' => $request->tahun_ajara_id,
                'status'        => $request->status,
            ]);

            $siswa->kelas()->sync([$request->kelas_id]);

            DB::commit();

            $siswa->load(['user.person', 'sekolah', 'tahunAjaran', 'kelas']);
            return (new SiswaResource($siswa))->response();
        } catch (\Exception $e) {
            DB::rollBack();

            if (isset($fotoPath) && $fotoPath) {
                Storage::disk('public')->delete($fotoPath);
            }

            return response()->json([
                'message' => 'Gagal memperbarui data siswa.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Siswa $siswa): JsonResponse
    {
        $siswa->user->person->delete();
        $siswa->user->delete();
        $siswa->delete();
        return response()->json(['message' => 'Data siswa berhasil dihapus.']);
    }

    public function importCsv(ImportSiswaRequest $request): JsonResponse
    {
        $sekolahId = $this->getSekolahId($request);
        $file = $request->file('file');
        $handle = fopen($file->getRealPath(), 'r');

        $headers = fgetcsv($handle);
        $headers = array_map('trim', $headers);

        $expectedHeaders = self::CSV_HEADERS;
        if (array_diff($expectedHeaders, $headers) || array_diff($headers, $expectedHeaders)) {
            fclose($handle);
            return response()->json([
                'message' => 'Format CSV tidak sesuai. Header harus: ' . implode(', ', $expectedHeaders),
            ], 422);
        }

        $success = [];
        $failures = [];
        $rowNumber = 1;

        DB::beginTransaction();
        try {
            while (($row = fgetcsv($handle)) !== false) {
                $rowNumber++;
                $data = array_combine($headers, $row);

                $validator = Validator::make($data, [
                    'email'          => ['required', 'email', 'unique:users,email'],
                    'username'       => ['nullable', 'string', 'max:255', 'unique:users,username'],
                    'password'       => ['required', 'string', 'min:8'],
                    'nisn'           => ['required', 'string', 'max:20', 'unique:siswa,nisn'],
                    'nis'            => ['nullable', 'string', 'max:20'],
                    'full_name'      => ['required', 'string', 'max:255'],
                    'nik'            => ['required', 'numeric', 'digits:16', 'unique:people,nik'],
                    'gender'         => ['required', 'in:L,P'],
                    'tempat_lahir'   => ['required', 'string', 'max:255'],
                    'tanggal_lahir'  => ['required', 'date', 'before:today'],
                    'alamat'         => ['required', 'string', 'max:500'],
                    'no_hp'          => ['required', 'string', 'max:16'],
                    'tahun_ajara_id' => ['required', 'integer', 'exists:tahun_ajaran,id'],
                    'kelas_id'       => ['required', 'integer', 'exists:kelas,id'],
                    'status'         => ['required', 'in:aktif,alumni,pindah,keluar'],
                ]);

                if ($validator->fails()) {
                    $failures[] = [
                        'row'    => $rowNumber,
                        'email'  => $data['email'] ?? '',
                        'errors' => $validator->errors()->all(),
                    ];
                    continue;
                }

                $user = User::create([
                    'username'   => $data['username'] ?: null,
                    'email'      => $data['email'],
                    'password'   => Hash::make($data['password']),
                    'role_id'    => Role::where('name', 'siswa')->value('id'),
                    'sekolah_id' => $sekolahId,
                ]);

                $user->person()->create([
                    'nik'          => $data['nik'],
                    'full_name'    => $data['full_name'],
                    'gender'       => $data['gender'],
                    'tempat_lahir' => $data['tempat_lahir'],
                    'tanggal_lahir' => $data['tanggal_lahir'],
                    'alamat'       => $data['alamat'],
                    'no_hp'        => $data['no_hp'],
                ]);

                $siswa = Siswa::create([
                    'user_id'       => $user->id,
                    'sekolah_id'    => $sekolahId,
                    'nisn'          => $data['nisn'],
                    'nis'           => $data['nis'] ?: null,
                    'tahun_ajara_id' => $data['tahun_ajara_id'],
                    'status'        => $data['status'],
                ]);

                $siswa->kelas()->attach($data['kelas_id']);

                $success[] = [
                    'row'       => $rowNumber,
                    'email'     => $data['email'],
                    'full_name' => $data['full_name'],
                ];
            }

            fclose($handle);

            if (!empty($failures)) {
                DB::rollBack();
                return response()->json([
                    'message' => 'Import gagal. Perbaiki data berikut dan coba lagi.',
                    'success_count' => count($success),
                    'failure_count' => count($failures),
                    'failures' => $failures,
                ], 422);
            }

            DB::commit();

            return response()->json([
                'message' => 'Import siswa berhasil.',
                'success_count' => count($success),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($handle)) {
                fclose($handle);
            }

            return response()->json([
                'message' => 'Terjadi kesalahan saat import CSV.',
                'error'   => config('app.debug') ? $e->getMessage() : 'Server Error',
            ], 500);
        }
    }
}
