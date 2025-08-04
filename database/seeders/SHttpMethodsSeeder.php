<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\HttpMethods\SHttpMethods;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SHttpMethodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SHttpMethods::query()->create($record);
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
                    'id' => 0,
                    'code' => 'ANY',
                    'description' => '',
                ],
                [
                    'code' => 'GET',
                    'description' => '',
                ],
                [
                    'code' => 'POST',
                    'description' => '',
                ],
                [
                    'code' => 'PUT',
                    'description' => '',
                ],
                [
                    'code' => 'PATCH',
                    'description' => '',
                ],
                [
                    'code' => 'DELETE',
                    'description' => '',
                ],
            ]
        );
    }
}
