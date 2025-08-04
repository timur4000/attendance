<?php

namespace App\Standards\RoutePublishers\Interfaces;

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
