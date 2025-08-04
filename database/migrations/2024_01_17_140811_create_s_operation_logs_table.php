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
        Schema::create('s_operation_logs', function (Blueprint $table) {
            $table->id();
            $table->string('method', 25);
            $table->string('path', 500);
            $table->string('route', 255);
            $table->string('description', 255)->nullable();
            $table->integer('id_user');
            $table->ipAddress('ip_address');
            $table->string('user_agent', 500)->nullable();
            $table->json('query');
            $table->json('data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_operation_logs');
    }
};
