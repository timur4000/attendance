<?php

namespace Database\Seeders;

use App\Models\Admin\Systems\Configurations\Values\SConfigurationValues;
use Illuminate\Database\Seeder;

class SConfigurationValuesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->records() as $record)
        {
            SConfigurationValues::query()->create($record);
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
                'id_configuration_group' => 1,
                'id_configuration_type'  => 1,
                'value_integer'          => 0,
                'value_min'              => 0,
                'value_max'              => 0,
                'value_string'           => '',
                'code'                   => 'Unknown',
                'description'            => '',
                'sort_order'             => 0,
                'is_editable'            => true,
                'is_hidden'              => false,
            ],
            [
                'id_configuration_group' => 2,
                'id_configuration_type'  => 4,
                'value_integer'          => 1,
                'value_min'              => 0,
                'value_max'              => 0,
                'value_string'           => '',
                'code'                   => 'IS_ORDER_PAID_AFTER_CONFIRMATION',
                'description'            => '',
                'sort_order'             => 0,
                'is_editable'            => true,
                'is_hidden'              => false,
            ],
            [
                'id_configuration_group' => 3,
                'id_configuration_type'  => 2,
                'value_integer'          => 5,
                'value_min'              => 0,
                'value_max'              => 0,
                'value_string'           => '',
                'code'                   => 'ORDER_ITEM_NEW_DURATION_MINUTES',
                'description'            => '',
                'sort_order'             => 0,
                'is_editable'            => true,
                'is_hidden'              => false,
            ],
            [
                'id_configuration_group' => 3,
                'id_configuration_type'  => 2,
                'value_integer'          => 10,
                'value_min'              => 0,
                'value_max'              => 0,
                'value_string'           => '',
                'code'                   => 'ORDER_ITEM_STALE_DURATION_MINUTES',
                'description'            => '',
                'sort_order'             => 0,
                'is_editable'            => true,
                'is_hidden'              => false,
            ],
            [
                'id_configuration_group' => 3,
                'id_configuration_type'  => 2,
                'value_integer'          => 15,
                'value_min'              => 0,
                'value_max'              => 0,
                'value_string'           => '',
                'code'                   => 'ORDER_ITEM_OLD_DURATION_MINUTES',
                'description'            => '',
                'sort_order'             => 0,
                'is_editable'            => true,
                'is_hidden'              => false,
            ],
        ]);
    }
}
