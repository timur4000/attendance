<?php

namespace App\RoutesRequests\Admin\Dashboards\Canteen;

use App\Admin\Controllers\Dashboards\Canteen\CanteenDashboardController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare one day route of canteen dashboard group.
 */
class CanteenDashboardOneDayPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CanteenDashboardController::class, 'one_day' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('one-day');
    }
}
