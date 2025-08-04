<?php

namespace App\RoutesRequests\Admin\Dashboards\Canteen;

use App\Admin\Controllers\Dashboards\Canteen\CanteenDashboardController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare two months sum route of canteen dashboard group.
 */
class CanteenDashboardTwoMonthsSumPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CanteenDashboardController::class, 'two_months_sum' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('two-months-sum');
    }
}
