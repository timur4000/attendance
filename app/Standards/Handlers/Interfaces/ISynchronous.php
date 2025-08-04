<?php

namespace App\Standards\Handlers\Interfaces;

use Illuminate\Database\Eloquent\Model;

/**
 * Implements logic for the 'many to many' relations.
 */
interface ISynchronous
{
    /**
     * @param Model $record
     *
     * @param array<int> $ids
     *
     * @return void
     */
    public static function sync(Model $record, array $ids = []): void;
}
