<?php

namespace App\ApiRequests\Data\Food\Orders;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderPayTheBillApiRequestSettings;

/**
 * Implements request for the data of the order pay the bill.
 */
class OrderPayTheBillApiRequest extends DataApiRequest
{
    public function __construct(OrderPayTheBillApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
