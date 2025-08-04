<?php

namespace App\ApiModels\Traits\Reports\Canteen;

use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements adding base properties of report canteen user standard.
 */
trait ReportCanteenUserProperties
{
    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('NameUser')]
    public string $name_user;

    #[ApiModelResponseKeyAttribute('IdCategory')]
    public int $id_category;

    #[ApiModelResponseKeyAttribute('NameCategory')]
    public string $name_category;
}
