<?php

namespace App\ApiRequests\Data\Food\FoodCard;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardCancelWithdrawMoneyApiRequestSettings;

/**
 * Implements request for the data of the food card cancel withdraw money.
 */
class FoodCardCancelWithdrawMoneyApiRequest extends DataApiRequest
{
    public function __construct(FoodCardCancelWithdrawMoneyApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
