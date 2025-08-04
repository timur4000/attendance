<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\Permissions\SHttpMethodsToSAdminPermissions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SHttpMethodsToAdminPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SHttpMethodsToSAdminPermissions::query()->create($record);
        }
    }

    private function records(): array
    {
        return (
            [
                [
                    'id_http_method' => 0,
                    'id_admin_permission' => 1,
                ],
                [
                    'id_http_method' => 0,
                    'id_admin_permission' => 2,
                ],
            ]
        );
    }
}
