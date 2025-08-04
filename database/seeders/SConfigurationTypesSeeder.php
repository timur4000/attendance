<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\Configurations\Types\SConfigurationTypes;
use Illuminate\Database\Seeder;

class SConfigurationTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SConfigurationTypes::query()->create($record);
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
                    'code' => 'Integer',
                    'description' => '',
                ],
                [
                    'code' => 'String',
                    'description' => '',
                ],
                [
                    'code' => 'Boolean',
                    'description' => '',
                ],
            ]
        );
    }
}
