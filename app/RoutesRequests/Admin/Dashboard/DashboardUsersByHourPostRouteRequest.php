<?php

namespace App\RoutesRequests\Admin\Dashboard;

use App\Admin\Controllers\Dashboard\DashboardController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare users by hour route of dashboard group.
 */
class DashboardUsersByHourPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ DashboardController::class, 'users_by_hour' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('users-by-hour');
    }
}
