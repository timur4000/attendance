<?php

namespace App\Standards\ApiModels\Attributes;

/**
 * Implements attribute logic for the given keys of response.
 */
#[\Attribute]
class ApiModelResponseKeyAttribute
{
    /**
     * Contains attribute value.
     *
     * @var string
     */
    public string $value;

    /**
     * @param string $value
     */
    public function __construct(string $value)
    {
        $this->value = $value;
    }
}
