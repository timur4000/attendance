<?php

namespace App\Standards\ApiRequestSettings\Classifiers\Parameters;

use App\ApiRequestSettings\Data\Parameters\ParameterSelectApiRequestSettings;

/**
 * Contains all possible ids of the api settings id_parameter property.
 *
 * @see ParameterSelectApiRequestSettings::$id_parameter
 */
enum ParametersIdsClassifier: string
{
    case ALL = '';

    case FOOD_CARD_BALANCE_MINIMUM = 'FOOD_CARD_BALANCE_MINIMUM';
}
