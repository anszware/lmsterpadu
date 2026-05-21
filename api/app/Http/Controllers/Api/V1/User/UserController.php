<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\User\UserResource;
use App\Http\Requests\Api\User\StoreUserRequest;
use App\Http\Requests\Api\User\UpdateUserRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index(\Illuminate\Http\Request $request): JsonResponse
    {
        $search = $request->query('search');

        $users = User::with(['role', 'person', 'sekolah', 'siswa', 'guru', 'pic'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('username', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhereHas('person', function ($qp) use ($search) {
                            $qp->where('full_name', 'like', "%{$search}%");
                        });
                });
            })
            ->paginate(15);

        return UserResource::collection($users)->response();
    }

    public function show(User $user): JsonResponse
    {
        $user->load(['role', 'person', 'sekolah']);
        return (new UserResource($user))->response();
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $user = User::create([
                'username' => $request->username,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'role_id'  => $request->role_id,
            ]);

            $personData = $request->only([
                'nik',
                'full_name',
                'gender',
                'tempat_lahir',
                'tanggal_lahir',
                'alamat',
                'provinsi_id',
                'kota_id',
                'kecamatan_id',
                'kelurahan_id',
                'rt',
                'rw',
                'no_hp'
            ]);

            if ($request->hasFile('foto')) {
                $personData['foto'] = $request->file('foto')->store('photos', 'public');
            }

            $user->person()->create($personData);

            $user->load(['role', 'person']);
            return (new UserResource($user))->response();
        });
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        return DB::transaction(function () use ($request, $user) {
            $userData = [
                'username' => $request->username,
                'email'    => $request->email,
                'role_id'  => $request->role_id,
            ];

            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            $user->update($userData);

            $personData = $request->only([
                'nik',
                'full_name',
                'gender',
                'tempat_lahir',
                'tanggal_lahir',
                'alamat',
                'provinsi_id',
                'kota_id',
                'kecamatan_id',
                'kelurahan_id',
                'rt',
                'rw',
                'no_hp'
            ]);

            if ($request->hasFile('foto')) {
                if ($user->person && $user->person->foto) {
                    Storage::disk('public')->delete($user->person->foto);
                }
                $personData['foto'] = $request->file('foto')->store('photos', 'public');
            }

            $user->person()->updateOrCreate(['user_id' => $user->id], $personData);

            $user->load(['role', 'person']);
            return (new UserResource($user))->response();
        });
    }

    public function destroy(User $user): JsonResponse
    {
        if ($user->person) {
            $user->person->delete();
        }
        $user->delete();
        return response()->json(['message' => 'User berhasil dihapus.']);
    }
}
