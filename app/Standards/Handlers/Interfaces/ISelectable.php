<?php

namespace App\Standards\Handlers\Interfaces;

use Illuminate\Support\Collection;

/**
 * Implements logic for select options.
 */
interface ISelectable
{
    /**
     * @param string $key
     *
     * @param string $value
     *
     * @return Collection
     */
    public static function to_select_options(string $key, string $value): Collection;
}
