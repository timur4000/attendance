<?php

namespace App\ApiModels\Dashboard\Attendance\AttendanceDataOneHour;

use App\ApiModels\Traits\Dashboard\AttendanceBaseProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for attendance data one hour response.
 */
class AttendanceDataOneHourApiModel extends ApiModel
{
    use AttendanceBaseProperties;

    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('NameUnit')]
    public string $name_unit;

    #[ApiModelResponseKeyAttribute('NameCategory')]
    public string $name_category;

    #[ApiModelResponseKeyAttribute('NamePosition')]
    public string $name_position;
}
