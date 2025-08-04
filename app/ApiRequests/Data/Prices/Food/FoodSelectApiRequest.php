<?php

namespace App\ApiRequests\Data\Prices\Food;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Prices\Food\FoodApiRequestSettings;

/**
 * Implements request for data of the food api.
 */
class FoodSelectApiRequest extends DataApiRequest
{
    public function __construct(FoodApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
