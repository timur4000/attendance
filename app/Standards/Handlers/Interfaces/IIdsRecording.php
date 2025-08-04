<?php

namespace App\Standards\Handlers\Interfaces;

use Illuminate\Support\Collection;

/**
 * Implements logic for records list by the given ids.
 */
interface IIdsRecording
{
    /**
     * @param array $ids
     *
     * @return Collection
     */
    public static function records_by_ids(array $ids = []): Collection;
}
