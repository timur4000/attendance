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
        Schema::create('s_admin_permission_groups_to_api_roles', function (Blueprint $table) {
            $table->id();
            $table->string('description', 255)->nullable();
            $table->foreignId('id_admin_permission_group')->references('id')->on('s_admin_permission_groups');
            $table->integer('id_role')->unique();
            $table->timestamps();

            $table->unique([ 'id_admin_permission_group', 'id_role' ], 's_admin_permission_groups_to_api_roles_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_admin_permission_groups_to_api_roles');
    }
};
