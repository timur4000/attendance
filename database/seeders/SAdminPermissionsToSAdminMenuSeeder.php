<?php

namespace Database\Seeders;

use App\Handlers\Admin\AdminMenu\AdminMenuHandler;
use App\Models\Admin\Systems\AdminMenu\SAdminPermissionsToAdminMenu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SAdminPermissionsToSAdminMenuSeeder extends Seeder
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
                    'id_admin_permission' => 1,
                    'id_admin_menu' => $record->id,
                ];

            SAdminPermissionsToAdminMenu::query()->create($attributes);
        }
    }
}
