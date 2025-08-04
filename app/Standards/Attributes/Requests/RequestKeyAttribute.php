<?php

namespace App\Standards\Attributes\Requests;

/**
 * Implements logic for the body key name of the request.
 */
#[\Attribute]
class RequestKeyAttribute
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
