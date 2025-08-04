<?php

namespace App\ApiRequests\Data\Food\Orders;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderFindDeletedApiRequestSettings;

/**
 * Implements request for the data of the order find deleted.
 */
class OrderFindDeletedApiRequest extends DataApiRequest
{
    public function __construct(OrderFindDeletedApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
