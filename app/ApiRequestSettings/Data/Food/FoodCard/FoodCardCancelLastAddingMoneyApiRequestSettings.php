<?php

namespace App\ApiRequestSettings\Data\Food\FoodCard;

use App\ApiRequests\Data\Food\FoodCard\FoodCardSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the food card cancel last adding money api request.
 *
 * @see FoodCardSelectApiRequest
 */
class FoodCardCancelLastAddingMoneyApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 54; // frontend_developer

    #[RequestKeyAttribute('MoneyAdded')]
    public float $money_added = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_CARD_CANCEL_LAST_ADDING_MONEY;
    }
}
