<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(SHttpMethodsSeeder::class);

        $this->call(SAdminPermissionsSeeder::class);

        $this->call(SHttpMethodsToAdminPermissionsSeeder::class);

        $this->call(SAdminPermissionGroupsSeeder::class);

        $this->call(SAdminPermissionsToSAdminPermissionGroupsSeeder::class);

        $this->call(SAdminPermissionGroupsToApiRolesSeeder::class);

        $this->call(SAdminMenuSeeder::class);

        $this->call(SAdminPermissionsToSAdminMenuSeeder::class);

        $this->call(SAdminPermissionGroupsToSAdminMenuSeeder::class);

        $this->call(SConfigurationGroupsSeeder::class);

        $this->call(SConfigurationTypesSeeder::class);

        $this->call(SConfigurationValuesSeeder::class);
    }
}
