<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class PersonController extends Controller
{
    /**
     * Update or Create person profile for the authenticated user.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();
        $personId = $user->person?->id;

        $validator = Validator::make($request->all(), [
            'full_name'     => ['required', 'string', 'max:255'],
            'nik'           => ['required', 'string', 'digits:16', Rule::unique('people', 'nik')->ignore($personId)],
            'gender'        => ['required', 'in:L,P'],
            'tempat_lahir'  => ['required', 'string', 'max:255'],
            'tanggal_lahir' => ['required', 'date'],
            'alamat'        => ['required', 'string'],
            'provinsi_id'   => ['required', 'exists:provinsis,id'],
            'kota_id'       => ['required', 'exists:kotas,id'],
            'kecamatan_id'  => ['required', 'exists:kecamatans,id'],
            'kelurahan_id'  => ['required', 'exists:kelurahans,id'],
            'rt'            => ['required', 'string', 'max:10'],
            'rw'            => ['required', 'string', 'max:10'],
            'no_hp'         => ['required', 'string', 'max:20'],
            'foto'          => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Data tidak valid.',
                'errors' => $validator->errors()
            ], 422);
        }

        return DB::transaction(function () use ($request, $user) {
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

            // Update or Create logic
            $user->person()->updateOrCreate(
                ['user_id' => $user->id],
                $personData
            );

            $user->load(['role', 'person', 'sekolah']);
            return (new UserResource($user))->response();
        });
    }

    public function index()
    {
        $people = \App\Models\Person::all();
        return response()->json($people);
    }
}
