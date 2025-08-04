<?php

namespace App\ApiRequests\Data\Food\FoodCard;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardCancelLastAddingMoneyApiRequestSettings;

/**
 * Implements request for the data of the food card cancel last adding money.
 */
class FoodCardCancelLastAddingMoneyApiRequest extends DataApiRequest
{
    public function __construct(FoodCardCancelLastAddingMoneyApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
