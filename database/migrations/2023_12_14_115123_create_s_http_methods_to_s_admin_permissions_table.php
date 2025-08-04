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
        Schema::create('s_http_methods_to_s_admin_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_http_method')->references('id')->on('s_http_methods');
            $table->foreignId('id_admin_permission')->references('id')->on('s_admin_permissions');

            $table->unique([ 'id_http_method', 'id_admin_permission' ], 's_http_methods_to_admin_permissions_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_http_methods_to_s_admin_permissions');
    }
};
