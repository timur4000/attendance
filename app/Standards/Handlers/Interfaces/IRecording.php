<?php

namespace App\Standards\Handlers\Interfaces;

use Illuminate\Support\Collection;

/**
 * Implements logic for records list.
 */
interface IRecording
{
    /**
     * @return Collection
     */
    public static function records(): Collection;
}
