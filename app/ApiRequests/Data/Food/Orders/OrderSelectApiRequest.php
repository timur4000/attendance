<?php

namespace App\ApiRequests\Data\Food\Orders;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderSelectApiRequestSettings;

/**
 * Implements request for the data of the order select.
 */
class OrderSelectApiRequest extends DataApiRequest
{
    public function __construct(OrderSelectApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
