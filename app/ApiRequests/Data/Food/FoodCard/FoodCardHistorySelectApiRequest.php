<?php

namespace App\ApiRequests\Data\Food\FoodCard;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardHistorySelectApiRequestSettings;

/**
 * Implements request for the data of the food card history balance.
 */
class FoodCardHistorySelectApiRequest extends DataApiRequest
{
    public function __construct(FoodCardHistorySelectApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
