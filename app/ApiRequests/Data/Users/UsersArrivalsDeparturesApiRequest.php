<?php

namespace App\ApiRequests\Data\Users;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Users\UsersArrivalsDeparturesApiRequestSettings;

/**
 * Implements request for the data of the users arrivals and departures.
 */
class UsersArrivalsDeparturesApiRequest extends DataApiRequest
{
    public function __construct(UsersArrivalsDeparturesApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
