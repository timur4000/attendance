<?php

namespace App\ApiRequests\Data\Food\Orders;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderPaymentCancelApiRequestSettings;

/**
 * Implements request for the data of the order payment cancel.
 */
class OrderPaymentCancelApiRequest extends DataApiRequest
{
    public function __construct(OrderPaymentCancelApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
