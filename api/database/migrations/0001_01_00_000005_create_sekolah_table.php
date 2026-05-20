<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sekolah', function (Blueprint $table) {
            $table->id();
            $table->string('npsn')->unique();
            $table->string('nama_sekolah');
            $table->text('alamat_sekolah')->nullable();
            $table->unsignedBigInteger('provinsi_id');
            $table->unsignedBigInteger('kota_id');
            $table->unsignedBigInteger('kecamatan_id');
            $table->unsignedBigInteger('kelurahan_id');
            $table->string('rt', 5)->nullable();
            $table->string('rw', 5)->nullable();
            $table->string('tlp_sekolah')->nullable();
            $table->string('email_sekolah')->nullable();
            $table->string('logo_sekolah')->nullable();
            $table->enum('jenjang', ['sd', 'mi', 'smp', 'mts', 'sma', 'ma', 'smk', 'mak'])->nullable();
            $table->enum('jenis_sekolah', ['negeri', 'swasta'])->nullable();
            $table->timestamps();

            $table->foreign('provinsi_id')->references('id')->on('provinsis');
            $table->foreign('kota_id')->references('id')->on('kotas');
            $table->foreign('kecamatan_id')->references('id')->on('kecamatans');
            $table->foreign('kelurahan_id')->references('id')->on('kelurahans');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sekolah');
    }
};
