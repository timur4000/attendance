<?php

namespace App\ApiModels\Dashboard\Users;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

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
}
