<?php

namespace App\ApiModels\Users;

use App\ApiModels\Traits\Users\UserProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;

/**
 * Implements model instance for user response.
 */
class UserApiModel extends ApiModel
{
    use UserProperties;
}
