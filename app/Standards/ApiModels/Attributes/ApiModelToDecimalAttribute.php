<?php

namespace App\Standards\ApiModels\Attributes;

use App\Standards\ApiModels\Interfaces\IApiModelAttributesHandled;
use App\Standards\Classifiers\Chars\CharsClassifiers;

/**
 * Implements attribute logic for transform given value to array.
 */
#[\Attribute]
class ApiModelToDecimalAttribute implements IApiModelAttributesHandled
{
    /**
     * @inheritdoc
     *
     * @param mixed $value
     *
     * @return mixed
     */
    static public function handle(mixed $value): string
    {
        return number_format($value, 2, CharsClassifiers::DECIMAL_SEPARATOR, '');
    }
}