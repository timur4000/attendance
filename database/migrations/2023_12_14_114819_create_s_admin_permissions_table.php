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
        Schema::create('s_admin_permissions', function (Blueprint $table) {
            $table->id();
            $table->string('code', 255)->unique();
            $table->string('description', 255)->nullable();
            $table->json('routes')->nullable();
            $table->string('custom_pattern', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_admin_permissions');
    }
};
