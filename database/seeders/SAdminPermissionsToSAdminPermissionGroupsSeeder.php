<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\AdminPermissionGroups\SAdminPermissionsToSAdminPermissionGroups;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SAdminPermissionsToSAdminPermissionGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SAdminPermissionsToSAdminPermissionGroups::query()->create($record);
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
                    'id_admin_permission' => 1,
                    'id_admin_permission_group' => 1,
                ],
                [
                    'id_admin_permission' => 2,
                    'id_admin_permission_group' => 2,
                ],
            ];
    }
}
