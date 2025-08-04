<?php

namespace App\RouteGroups\Admin\Dashboards\Canteen;

use App\RoutesRequests\Admin\Dashboards\Canteen\CanteenDashboardIndexGetRouteRequest;
use App\RoutesRequests\Admin\Dashboards\Canteen\CanteenDashboardOneDayPostRouteRequest;
use App\RoutesRequests\Admin\Dashboards\Canteen\CanteenDashboardEachDayInMonthPostRouteRequest;
use App\RoutesRequests\Admin\Dashboards\Canteen\CanteenDashboardOneMonthPostRouteRequest;
use App\RoutesRequests\Admin\Dashboards\Canteen\CanteenDashboardTwoDaysPostRouteRequest;
use App\RoutesRequests\Admin\Dashboards\Canteen\CanteenDashboardTwoMonthsSumPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the canteen dashboard.
 */
class CanteenDashboardRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('canteen');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(CanteenDashboardIndexGetRouteRequest::class);

        $this->call_request(CanteenDashboardOneDayPostRouteRequest::class);

        $this->call_request(CanteenDashboardEachDayInMonthPostRouteRequest::class);

        $this->call_request(CanteenDashboardOneMonthPostRouteRequest::class);

        $this->call_request(CanteenDashboardTwoDaysPostRouteRequest::class);

        $this->call_request(CanteenDashboardTwoMonthsSumPostRouteRequest::class);
    }
}
