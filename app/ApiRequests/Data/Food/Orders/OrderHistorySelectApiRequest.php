<?php

namespace App\ApiRequests\Data\Food\Orders;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderHistorySelectApiRequestSettings;

/**
 * Implements request for the data of the order history select.
 */
class OrderHistorySelectApiRequest extends DataApiRequest
{
    public function __construct(OrderHistorySelectApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
