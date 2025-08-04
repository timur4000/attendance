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
        Schema::create('s_admin_menu', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_parent')->nullable()->references('id')->on('s_admin_menu');
//            $table->foreignId('id_admin_permission_group')->references('id')->on('s_admin_permission_groups');
            $table->string('title', 255);
            $table->string('description', 255)->nullable();
            $table->string('id_icon', 255)->nullable();
            $table->string('route', 255)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_admin_menu');
    }
};
