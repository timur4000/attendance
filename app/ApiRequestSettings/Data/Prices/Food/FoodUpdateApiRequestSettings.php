<?php

namespace App\ApiRequestSettings\Data\Prices\Food;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible base settings of the food update requests.
 */
class FoodUpdateApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdObject')]
    public int $id_object = 0;

    #[RequestKeyAttribute('Price')]
    public float $price = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::PRICE_FOOD_UPDATE;
    }
}
