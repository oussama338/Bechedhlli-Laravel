<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('delivery_notes', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->string('type')->default('Mono');
            $table->date('date');
            $table->string('status')->default('waiting');
            $table->boolean('invoiced')->default(false);
            $table->string('puissance')->nullable();
            $table->string('ref_steg')->nullable();
            $table->string('transporteur_name')->nullable();
            $table->string('transporteur_matricule')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_notes');
    }
};
