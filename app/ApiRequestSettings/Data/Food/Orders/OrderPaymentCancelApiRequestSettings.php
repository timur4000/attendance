<?php

namespace App\ApiRequestSettings\Data\Food\Orders;

use App\ApiRequests\Data\Food\Orders\OrderSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the order payment cancel api request.
 *
 * @see OrderSelectApiRequest
 */
class OrderPaymentCancelApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdOrder')]
    public int $id_order = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_ORDER_PAYMENT_CANCEL;
    }
}
