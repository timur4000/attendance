<?php

namespace App\Standards\Handlers\Interfaces;

use Illuminate\Database\Eloquent\Model;

/**
 * Implements interface for returning.
 */
interface IGetting
{
    /**
     * @param int|null $id
     *
     * @return Model|null
     */
    public static function get(? int $id = null): Model | null;
}
