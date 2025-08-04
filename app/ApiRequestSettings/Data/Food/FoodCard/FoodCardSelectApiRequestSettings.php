<?php

namespace App\ApiRequestSettings\Data\Food\FoodCard;

use App\ApiRequests\Data\Food\FoodCard\FoodCardSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the food card balance api request.
 *
 * @see FoodCardSelectApiRequest
 */
class FoodCardSelectApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 54; // frontend_developer

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_CARD_SELECT;
    }
}
