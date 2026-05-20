<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
        ['name' => 'admin', 'display_name' => 'Administrator'],
        ['name' => 'pic', 'display_name' => 'PIC Sekolah'],
        ['name' => 'teacher', 'display_name' => 'Guru'],
        ['name' => 'student', 'display_name' => 'Siswa'],
    ];

        foreach ($roles as $role) {
            \App\Models\Role::create($role);
        }

    }
}
