<?php

namespace App\ApiRequestSettings\Data\Food\Orders;

use App\ApiRequests\Data\Food\Orders\OrderSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the order pay the bill api request.
 *
 * @see OrderSelectApiRequest
 */
class OrderPayTheBillApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('Payment')]
    public float $payment = 0;

    #[RequestKeyAttribute('IdOrder')]
    public int $id_order = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_ORDER_PAY_THE_BILL;
    }
}
