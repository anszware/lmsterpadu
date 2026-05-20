<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kelas_siswa', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kelas_sekolah_id');
            $table->unsignedBigInteger('siswa_id');
            $table->timestamps();

            $table->foreign('kelas_sekolah_id')->references('id')->on('kelas')->onDelete('cascade');
            $table->foreign('siswa_id')->references('id')->on('siswa')->onDelete('cascade');

            $table->unique(['kelas_sekolah_id', 'siswa_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kelas_siswa');
    }
};
