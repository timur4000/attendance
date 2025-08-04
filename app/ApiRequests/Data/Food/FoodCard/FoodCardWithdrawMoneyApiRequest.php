<?php

namespace App\ApiRequests\Data\Food\FoodCard;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardWithdrawMoneyApiRequestSettings;

/**
 * Implements request for the data of the food card withdraw money.
 */
class FoodCardWithdrawMoneyApiRequest extends DataApiRequest
{
    public function __construct(FoodCardWithdrawMoneyApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
