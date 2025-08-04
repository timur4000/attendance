<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\AdminPermissionGroups\SAdminPermissionGroups;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SAdminPermissionGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SAdminPermissionGroups::query()->create($record);
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
                    'code' => 'Administrator',
                    'description' => '',
                ],
                [
                    'code' => 'AIS Canteen Manager',
                    'description' => '',
                ],
            ];
    }
}
