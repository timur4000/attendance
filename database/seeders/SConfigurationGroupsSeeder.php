<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\Configurations\Groups\SConfigurationGroups;
use Illuminate\Database\Seeder;

class SConfigurationGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SConfigurationGroups::query()->create($record);
        }
    }

    /**
     * @return array
     */
    private function records(): array
    {
        return (
            [
                [
                    'code' => 'Unknown',
                    'description' => '',
                ],
                [
                    'code' => 'System',
                    'description' => '',
                ],
                [
                    'code' => 'Canteen',
                    'description' => '',
                ],
            ]
        );
    }
}
