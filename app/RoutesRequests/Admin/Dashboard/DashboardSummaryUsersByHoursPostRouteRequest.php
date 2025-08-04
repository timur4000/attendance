<?php

namespace App\RoutesRequests\Admin\Dashboard;

use App\Admin\Controllers\Dashboard\DashboardController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare summary users by hours route of dashboard group.
 */
class DashboardSummaryUsersByHoursPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ DashboardController::class, 'summary_users_by_hours' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('summary-users-by-hours');
    }
}
