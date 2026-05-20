<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mgmp', function (Blueprint $table) {
            $table->id();
            $table->string('nama_mgmp');
            $table->enum('jenjang', ['sd', 'mi', 'smp', 'mts', 'sma', 'ma', 'smk', 'mak'])->nullable();
            $table->string('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mgmp');
    }
};
