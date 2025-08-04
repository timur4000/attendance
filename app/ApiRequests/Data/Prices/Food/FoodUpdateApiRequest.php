<?php

namespace App\ApiRequests\Data\Prices\Food;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Prices\Food\FoodUpdateApiRequestSettings;

/**
 * Implements request for data of the food update api.
 */
class FoodUpdateApiRequest extends DataApiRequest
{
    public function __construct(FoodUpdateApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
