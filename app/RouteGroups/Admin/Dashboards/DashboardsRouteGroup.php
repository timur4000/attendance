<?php

namespace App\RouteGroups\Admin\Dashboards;

use App\RouteGroups\Admin\Dashboards\Canteen\CanteenDashboardRouteGroup;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the dashboards.
 */
class DashboardsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('dashboards');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call(CanteenDashboardRouteGroup::class);
    }
}
