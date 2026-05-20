<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();\// 1. Isi tabel roles dulu agar ID-nya tersedia
        $this->call([
            RoleSeeder::class,
        ]);

        User::create([
            'username' => 'admin',
            'email' => 'admin@lms.com',
            'email_verified_at' => now(),
            'role_id' => 1, // Assuming the admin role has an ID of 1
            'password' => Hash::make('admin123'), // Don't forget to hash the password
        ]);
    }
}
