<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\Permissions\SAdminPermissions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SAdminPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SAdminPermissions::query()->create($record);
        }
    }

    private function records(): array
    {
        return (
            [
                [
                    'code' => 'All permissions',
                    'description' => '',
                    'routes' => [],
                    'custom_pattern' => '*',
                ],
                [
                    'code' => 'Advanced users',
                    'description' => '',
                    'routes' => [],
                    'custom_pattern' => 'admin.sca-users.*',
                ],
            ]
        );
    }
}
