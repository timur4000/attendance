<?php

namespace Database\Seeders;

use App\Handlers\Admin\AdminMenu\AdminMenuHandler;
use App\Models\Admin\Systems\AdminMenu\SAdminPermissionGroupsToAdminMenu;
use Illuminate\Database\Seeder;

class SAdminPermissionGroupsToSAdminMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (AdminMenuHandler::records() as $record)
        {
            $attributes =
                [
                    'id_admin_permission_group' => 1,
                    'id_admin_menu' => $record->id,
                ];

            SAdminPermissionGroupsToAdminMenu::query()->create($attributes);
        }
    }
}
