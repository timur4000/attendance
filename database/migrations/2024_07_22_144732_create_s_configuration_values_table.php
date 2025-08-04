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
        Schema::create('s_configuration_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_configuration_group')->default(1)->references('id')->on('s_configuration_groups');
            $table->foreignId('id_configuration_type')->default(1)->references('id')->on('s_configuration_types');
            $table->string('code', 100);
            $table->boolean('is_editable')->default(true);
            $table->bigInteger('value_integer')->default(0);
            $table->bigInteger('value_min')->default(0);
            $table->bigInteger('value_max')->default(0);
            $table->string('value_string', 1000)->nullable();
            $table->string('description', 255)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_hidden')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_configuration_values');
    }
};
