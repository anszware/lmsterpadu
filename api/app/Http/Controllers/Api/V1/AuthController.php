<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Api\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            $loginType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

            $user = User::with(['role', 'sekolah', 'person'])
                ->where($loginType, $request->username)
                ->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Akun tidak ditemukan. Silakan periksa kembali username atau email Anda.'
                ], 404);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password yang Anda masukkan salah.'
                ], 401);
            }

            $user->tokens()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'username' => $user->username,
                    'email' => $user->email,
                    'role' => $user->role ? [
                    'id' => $user->role->id,
                    'role' => $user->role->name,
                ] : null,
                    'sekolah' => $user->sekolah ? [
                        'id' => $user->sekolah->id,
                        'nama' => $user->sekolah->nama_sekolah,
                        'alamat' => $user->sekolah->alamat_sekolah,
                        'tlp_sekolah' => $user->sekolah->tlp_sekolah,
                        'email_sekolah' => $user->sekolah->email_sekolah
                    ] : null,
                    'person' => $user->person ? [
                        'full_name' => $user->person->full_name,
                        'nik' => $user->person->nik,
                    ] : null,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan pada server.',
                'error_detail' => config('app.debug') ? $e->getMessage() : 'Server Error',
                'data_request' => $request->all()
            ], 500);
        }
    }

    public function me(Request $request)
    {
        $user = $request->user()->load(['role', 'sekolah', 'person.provinsi', 'person.kota', 'person.kecamatan', 'person.kelurahan']);

        return response()->json([
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role ? [
                'id' => $user->role->id,
                'role' => $user->role->name,
            ] : null,
            'sekolah' => $user->sekolah ? [
                'id' => $user->sekolah->id,
                'npsn' => $user->sekolah->npsn,
                'nama' => $user->sekolah->nama_sekolah,
                'alamat' => $user->sekolah->alamat_lengkap,
                'tlp_sekolah' => $user->sekolah->tlp_sekolah,
                'email_sekolah' => $user->sekolah->email_sekolah
            ] : null,
            'person' => $user->person ?  [
                "id" => $user->person->id,
                "full_name" => $user->person->full_name,
                "gender" => $user->person->gender,
                "tempat_lahir" => $user->person->tempat_lahir,
                "tanggal_lahir" => $user->person->tanggal_lahir,
                "alamat" => $user->person->alamat,
                "alamat_lengkap" => $user->person->alamat_lengkap,
                "foto" => $user->person->foto,
                "nik" => $user->person->nik,
                "rt" => $user->person->rt,
                "rw" => $user->person->rw,
                "kelurahan_id" => $user->person->kelurahan_id,
                "kecamatan_id" => $user->person->kecamatan_id,
                "kota_id" => $user->person->kota_id,
                "provinsi_id" => $user->person->provinsi_id,
                "no_hp" => $user->person->no_hp,
                "created_at" => $user->person->created_at,
                "updated_at" => $user->person->updated_at,
                "deleted_at" => $user->person->deleted_at
            ] : null,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Berhasil keluar.'
        ]);
    }
}
