<?php

namespace App\Standards\ApiModels\Attributes;

use App\Standards\ApiModels\Interfaces\IApiModelAttributesHandled;
use App\Standards\Classifiers\Chars\CharsClassifiers;

/**
 * Implements logic for the body key name of the request.
 */
#[\Attribute]
class ApiModelStringToArrayByCommaAttribute implements IApiModelAttributesHandled
{
    static public function handle(mixed $value): mixed
    {
        if (is_array($value))
        {
            return $value;
        }

        return explode(CharsClassifiers::STRING_SEPARATOR, $value);
    }
}
