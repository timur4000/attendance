<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\AdminRoles\SAdminPermissionGroupsToApiRoles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SAdminPermissionGroupsToApiRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SAdminPermissionGroupsToApiRoles::query()->create($record);
        }
    }

    /**
     * @return array[]
     */
    private function records(): array
    {
        return
            [
                [
                    'description' => '',
                    'id_admin_permission_group' => 1,
                    'id_role' => 2,
                ],
                [
                    'description' => '',
                    'id_admin_permission_group' => 1,
                    'id_role' => 12000,
                ],
                [
                    'description' => '',
                    'id_admin_permission_group' => 2,
                    'id_role' => 81300,
                ],
            ];
    }
}
