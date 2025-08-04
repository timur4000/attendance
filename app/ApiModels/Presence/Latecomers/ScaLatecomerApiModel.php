<?php

namespace App\ApiModels\Presence\Latecomers;

use App\ApiModels\Presence\PresenceApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for user sca latecomer response.
 */
class ScaLatecomerApiModel extends PresenceApiModel
{
    #[ApiModelResponseKeyAttribute('IdAbsence')]
    public int $id_absence;

    #[ApiModelResponseKeyAttribute('DateStart')]
    public string $date_start;

    #[ApiModelResponseKeyAttribute('DateEnd')]
    public string $date_end;

    #[ApiModelResponseKeyAttribute('NameAbsence')]
    public string $name_absence;
}
