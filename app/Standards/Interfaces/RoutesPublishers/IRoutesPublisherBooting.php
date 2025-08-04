<?php

namespace App\Standards\Interfaces\RoutesPublishers;

/**
 * Implements standard for routes publish classes.
 */
interface IRoutesPublisherBooting
{
    /**
     * Booting routes.
     *
     * @return void
     */
    static public function booting(): void;
}
