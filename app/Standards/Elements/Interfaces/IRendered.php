<?php

namespace App\Standards\Elements\Interfaces;

/**
 * Implements logic for element rendering.
 */
interface IRendered
{
    /**
     * Implements render html of the element.
     *
     * @return string
     */
    public function render(): string;
}
