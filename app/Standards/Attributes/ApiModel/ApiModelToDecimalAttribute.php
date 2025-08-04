<?php

namespace App\Standards\Attributes\ApiModel;

use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Interfaces\ApiModels\IApiModelAttributesHandled;

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