<?php

namespace App\Standards\Handlers\Interfaces;

/**
 * Implements interface for deleting.
 */
interface IDeleting
{
    /**
     * @param int $id
     *
     * @return mixed
     */
    public static function delete(int $id): mixed;
}
