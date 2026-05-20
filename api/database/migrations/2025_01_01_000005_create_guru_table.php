<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guru', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('mgmp_id')->nullable();
            $table->string('nuptk')->nullable();
            $table->string('nrg')->nullable();
            $table->string('nip')->nullable();
            $table->string('gelar_depan')->nullable();
            $table->string('gelar_belakang')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('mgmp_id')->references('id')->on('mgmp')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guru');
    }
};
