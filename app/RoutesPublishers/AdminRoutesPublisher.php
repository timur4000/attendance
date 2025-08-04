<?php

namespace App\RoutesPublishers;

use App\RouteGroups\Admin\AdminRouteGroup;
use App\Standards\RoutePublishers\Interfaces\IRoutesPublisherBooting;

/**
 * Implements publish for admin routes.
 */
class AdminRoutesPublisher implements IRoutesPublisherBooting
{
    /**
     * @inheritdoc
     *
     * @return void
     */
    static public function booting(): void
    {
        $admin_route_group = new AdminRouteGroup();

        $admin_route_group->declare();
    }
}
