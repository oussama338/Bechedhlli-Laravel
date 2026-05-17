<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('steg_dossiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->string('ref_steg');
            $table->string('puissance')->nullable();
            $table->string('status')->default('prep');
            $table->json('docs')->nullable();
            $table->text('notes')->nullable();
            $table->date('submitted_date')->nullable();
            $table->date('approved_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('steg_dossiers');
    }
};
