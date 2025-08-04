<?php

namespace App\ApiRequests\Data\ScaUsers;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\ScaUsers\ScaUsersApiRequestSettings;

/**
 * Implements request for the data of the sca users.
 */
class ScaUsersSelectApiRequest extends DataApiRequest
{
    public function __construct(ScaUsersApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
