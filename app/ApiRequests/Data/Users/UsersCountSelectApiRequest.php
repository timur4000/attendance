<?php

namespace App\ApiRequests\Data\Users;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Users\UsersCountSelectApiRequestSettings;

/**
 * Implements request for the data of the user count.
 *
 * @deprecated
 */
class UsersCountSelectApiRequest extends DataApiRequest
{
    public function __construct(UsersCountSelectApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
