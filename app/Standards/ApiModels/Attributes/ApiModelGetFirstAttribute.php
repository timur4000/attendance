<?php

namespace App\Standards\ApiModels\Attributes;

use App\Standards\ApiModels\Interfaces\IApiModelAttributesHandled;

/**
 * Implements attribute logic for get the first item from collection of response.
 */
#[\Attribute]
class ApiModelGetFirstAttribute implements IApiModelAttributesHandled
{
    /**
     * @inheritdoc
     *
     * @param mixed $value
     *
     * @return mixed
     */
    static public function handle(mixed $value): mixed
    {
        return $value[0] ?? null;
    }
}
