<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mata_pelajaran', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mgmp_id')->nullable();
            $table->string('nama_mata_pelajaran');
            $table->enum('jenjang', ['sd', 'mi', 'smp', 'mts', 'sma', 'ma', 'smk', 'mak'])->nullable();
            $table->text('deskripsi')->nullable();
            $table->timestamps();

            $table->foreign('mgmp_id')->references('id')->on('mgmp')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mata_pelajaran');
    }
};
