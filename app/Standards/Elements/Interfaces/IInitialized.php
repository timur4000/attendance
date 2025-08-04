<?php

namespace App\Standards\Elements\Interfaces;

/**
 * Implements logic for initialize of elements.
 */
interface IInitialized
{
    /**
     * @return static
     */
    public function initialization(): static;
}
