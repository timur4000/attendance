<?php

namespace App\RouteGroups\Admin\Dashboard;

use App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest;
use App\RoutesRequests\Admin\Dashboard\DashboardScaPresenceTotalPostRouteRequest;
use App\RoutesRequests\Admin\Dashboard\DashboardSummaryUsersByHoursPostRouteRequest;
use App\RoutesRequests\Admin\Dashboard\DashboardUsersByCategoryPostRouteRequest;
use App\RoutesRequests\Admin\Dashboard\DashboardUsersByHourPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

class DashboardRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('dashboard');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(DashboardIndexGetRouteRequest::class);

        $this->call_request(DashboardUsersByCategoryPostRouteRequest::class);

        $this->call_request(DashboardSummaryUsersByHoursPostRouteRequest::class);

        $this->call_request(DashboardScaPresenceTotalPostRouteRequest::class);

        $this->call_request(DashboardUsersByHourPostRouteRequest::class);
    }
}
