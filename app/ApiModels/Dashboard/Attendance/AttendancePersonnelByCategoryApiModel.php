<?php

namespace App\ApiModels\Dashboard\Attendance;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;
use Illuminate\Support\Collection;

/**
 * Implements model instance for attendance personnel by category response.
 */
class AttendancePersonnelByCategoryApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdCategory')]
    public int $id_category;

    #[ApiModelResponseKeyAttribute('CodeCategory')]
    public string $code_category;

    #[ApiModelResponseKeyAttribute('NameCategory')]
    public string $name_category;

    #[ApiModelResponseKeyAttribute('CountTotal')]
    public int $count_total;

    #[ApiModelResponseKeyAttribute('CountAtWork')]
    public int $count_at_work;

    #[ApiModelResponseKeyAttribute('CountAtHome')]
    public int $count_at_home;

    /**
     * Returns record with the total of the given collection.
     *
     * @param Collection $collection
     *
     * @return AttendancePersonnelByCategoryApiModel
     */
    public static function get_total_record(Collection $collection): AttendancePersonnelByCategoryApiModel
    {
        $model = new AttendancePersonnelByCategoryApiModel([]);

        $model->id_category = -1;

        $model->code_category = 'c_total';

        $model->name_category = 'Total';

        $model->count_total = $collection->sum('count_total');

        $model->count_at_work = $collection->sum('count_at_work');

        $model->count_at_home = $collection->sum('count_at_home');

        return $model;
    }
}
