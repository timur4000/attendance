<?php

namespace App\ApiRequests\Data\Food\Orders;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderDeleteApiRequestSettings;

/**
 * Implements request for the data of the order delete.
 */
class OrderDeleteApiRequest extends DataApiRequest
{
    public function __construct(OrderDeleteApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
