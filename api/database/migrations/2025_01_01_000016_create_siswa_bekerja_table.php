<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('siswa_bekerja', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('siswa_alumni_id');
            $table->string('nama_instansi');
            $table->string('divisi')->nullable();
            $table->year('tahun_masuk')->nullable();
            $table->text('deskripsi_instansi')->nullable();
            $table->string('logo_instansi')->nullable();
            $table->boolean('isActive')->default(true);
            $table->timestamps();

            $table->foreign('siswa_alumni_id')->references('id')->on('siswa_alumni')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('siswa_bekerja');
    }
};
