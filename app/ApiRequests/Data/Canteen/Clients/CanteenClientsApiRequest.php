<?php

namespace App\ApiRequests\Data\Canteen\Clients;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Canteen\Clients\CanteenClientsApiRequestSettings;

/**
 * Implements request for the data of the canteen clients.
 */
class CanteenClientsApiRequest extends DataApiRequest
{
    public function __construct(CanteenClientsApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
