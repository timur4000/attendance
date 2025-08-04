<?php

namespace App\ApiRequestSettings\Data\Food\FoodCard;

use App\ApiRequests\Data\Food\FoodCard\FoodCardSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the food card history balance api request.
 *
 * @see FoodCardSelectApiRequest
 */
class FoodCardHistorySelectApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 54; // frontend_developer

    #[RequestKeyAttribute('DateStart')]
    public string $date_start = '';

    #[RequestKeyAttribute('DateEnd')]
    public string $date_end = '';

    #[RequestKeyAttribute('CountOnly')]
    public int $count_only = 0;

    #[RequestKeyAttribute('Limit')]
    public int $limit = 0;

    #[RequestKeyAttribute('Offset')]
    public int $offset = 0;

    #[RequestKeyAttribute('Ascending')]
    public int $ascending = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_CARD_HISTORY_SELECT;
    }
}
