<?php

namespace App\Standards\Interfaces\ApiModels;

/**
 * Implements logic to attributes for value handling.
 */
interface IApiModelAttributesHandled
{
    /**
     * Processes the given value and returns post-processed value.
     *
     * @param mixed $value
     *
     * @return mixed
     */
    static public function handle(mixed $value): mixed;
}