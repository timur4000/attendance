<?php

namespace App\ApiRequestSettings\Data\Food\Orders;

use App\ApiRequests\Data\Food\Orders\OrderSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\ApiRequestSettings\Classifiers\AscendingStatesClassifier;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the order select api request.
 *
 * @see OrderSelectApiRequest
 */
class OrderHistorySelectApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('DateStart')]
    public string $date_start = '';

    #[RequestKeyAttribute('DateEnd')]
    public string $date_end = '';

    #[RequestKeyAttribute('CountOnly')]
    public int $count_only = 0;

    #[RequestKeyAttribute('Limit')]
    public int $limit = 0;

    #[RequestKeyAttribute('Offset')]
    public int $offset = 0;

    #[RequestKeyAttribute('Ascending')]
    public AscendingStatesClassifier $ascending = AscendingStatesClassifier::DESC;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_ORDER_HISTORY_SELECT;
    }
}
