<?php

namespace App\ApiRequests\Data\Users;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Users\UsersSelectApiRequestSettings;

/**
 * Implements request for the data of the users.
 */
class UsersSelectApiRequest extends DataApiRequest
{
    public function __construct(UsersSelectApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
