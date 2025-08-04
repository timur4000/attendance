<?php

namespace App\ApiRequests\Data\Food\FoodCard;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardAddMoneyApiRequestSettings;

/**
 * Implements request for the data of the food card add money.
 */
class FoodCardAddMoneyApiRequest extends DataApiRequest
{
    public function __construct(FoodCardAddMoneyApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
