<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class PersonController extends Controller
{
    public function index()
    {

        $people = Person::all();

        return response()->json($people);
    }
    public function store(Request $request, $id)
    {
        $request->validate([
            'nik' => 'required|unique:people,nik|numeric|digits:16',
            'full_name' => 'required|string|max:255',
            'gender' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string|max:255',
            'provinsi_id' => 'required|exists:provinsis,id',
            'kota_id' => 'required|exists:kotas,id',
            'kecamatan_id' => 'required|exists:kecamatans,id',
            'kelurahan_id' => 'required|exists:kelurahans,id',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'no_hp' => 'required|string|max:16',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $person = Person::create([
            'nik' => $request->nik,
            'full_name' => $request->full_name,
            'gender' => $request->gender,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'alamat' => $request->alamat,
            'provinsi_id' => $request->provinsi_id,
            'kota_id' => $request->kota_id,
            'kecamatan_id' => $request->kecamatan_id,
            'kelurahan_id' => $request->kelurahan_id,
            'rt' => $request->rt,
            'rw' => $request->rw,
            'no_hp' => $request->no_hp,
            'foto' => $request->foto,
            'user_id' => $id,
        ]);

        return response()->json($person, 201);
    }

    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);
        $person->update($request->all());

        return response()->json($person);
    }
}
