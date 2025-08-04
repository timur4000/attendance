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
        Schema::create('s_admin_permissions_to_s_admin_permission_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_admin_permission')->references('id')->on('s_admin_permissions');
            $table->foreignId('id_admin_permission_group')->references('id')->on('s_admin_permission_groups');

            $table->unique([ 'id_admin_permission', 'id_admin_permission_group' ], 's_admin_permissions_to_s_admin_permission_groups_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_admin_permissions_to_s_admin_permission_groups');
    }
};
