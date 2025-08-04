<?php

namespace App\ApiRequestSettings\Data\Food\Orders;

use App\ApiRequests\Data\Food\Orders\OrderSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the order find deleted api request.
 *
 * @see OrderSelectApiRequest
 */
class OrderFindDeletedApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('ListOfOrders')]
    public string $list_of_orders = '';

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_ORDER_FIND_DELETED;
    }
}
