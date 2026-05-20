<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('sekolah_id');
            $table->string('nisn')->nullable();
            $table->string('nis')->nullable();
            $table->unsignedBigInteger('tahun_ajara_id')->nullable();
            $table->enum('status', ['aktif', 'alumni', 'pindah', 'keluar'])->default('aktif');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('sekolah_id')->references('id')->on('sekolah')->onDelete('cascade');
            $table->foreign('tahun_ajara_id')->references('id')->on('tahun_ajaran')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
