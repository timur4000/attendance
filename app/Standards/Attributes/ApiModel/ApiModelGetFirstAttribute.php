<?php

namespace App\Standards\Attributes\ApiModel;

use App\Standards\Interfaces\ApiModels\IApiModelAttributesHandled;

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
