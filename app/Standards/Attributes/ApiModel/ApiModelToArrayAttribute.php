<?php

namespace App\Standards\Attributes\ApiModel;

use App\Standards\Interfaces\ApiModels\IApiModelAttributesHandled;

/**
 * Implements attribute logic for transform given value to array.
 */
#[\Attribute]
class ApiModelToArrayAttribute implements IApiModelAttributesHandled
{
    /**
     * @inheritdoc
     *
     * @param mixed $value
     *
     * @return mixed
     */
    static public function handle(mixed $value): array
    {
        return (array) $value;
    }
}