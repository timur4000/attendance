<?php

namespace App\ApiModels\Presence;

use App\ApiModels\Traits\Users\UserCustomProperties;
use App\ApiModels\Traits\Users\UserProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for user sca latecomer response.
 */
class PresenceApiModel extends ApiModel
{
    use UserCustomProperties, UserProperties;

    #[ApiModelResponseKeyAttribute('FirstEnter')]
    public string $first_enter;

    #[ApiModelResponseKeyAttribute('LastEnter')]
    public string $last_enter;

    #[ApiModelResponseKeyAttribute('LastExit')]
    public string $last_exit;

    #[ApiModelResponseKeyAttribute('CountEnter')]
    public int $count_enter;

    #[ApiModelResponseKeyAttribute('CountExit')]
    public int $count_exit;

    #[ApiModelResponseKeyAttribute('LocationAtWork')]
    public int $location_at_work;

    #[ApiModelResponseKeyAttribute('IsRegistered')]
    public int $is_registered;
}
