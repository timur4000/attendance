<?php

namespace App\ApiRequests\Data\Food\Orders;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderCreateApiRequestSettings;

/**
 * Implements request for the data of the order create.
 */
class OrderCreateApiRequest extends DataApiRequest
{
    public function __construct(OrderCreateApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
