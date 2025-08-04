<?php

namespace App\ApiModels\Traits\Users;

use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements adding custom properties of user.
 */
trait UserCustomProperties
{
    #[ApiModelResponseKeyAttribute('InfoParent1')]
    public string $info_parent_1;

    #[ApiModelResponseKeyAttribute('InfoParent2')]
    public string $info_parent_2;

    #[ApiModelResponseKeyAttribute('InfoDriver1')]
    public string $info_driver_1;
}
