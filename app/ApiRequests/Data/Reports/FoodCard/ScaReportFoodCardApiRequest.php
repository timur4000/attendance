<?php

namespace App\ApiRequests\Data\Reports\FoodCard;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Reports\FoodCard\ScaReportFoodCardApiRequestSettings;

/**
 * Implements request for the data of the sca report food card.
 */
class ScaReportFoodCardApiRequest extends DataApiRequest
{
    public function __construct(ScaReportFoodCardApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
