<?php

namespace App\Standards\Attributes\Classes;

/**
 * Implements logic for the namespaces.
 */
#[\Attribute]
class ClassAttribute
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
