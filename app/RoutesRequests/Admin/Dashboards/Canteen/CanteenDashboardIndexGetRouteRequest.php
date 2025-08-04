<?php

namespace App\RoutesRequests\Admin\Dashboards\Canteen;

use App\Admin\Controllers\Dashboards\Canteen\CanteenDashboardController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of canteen dashboard group.
 */
class CanteenDashboardIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CanteenDashboardController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
