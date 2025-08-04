<?php

namespace App\RoutesRequests\Admin\Dashboard;

use App\Admin\Controllers\Dashboard\DashboardController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare sca presence total route of dashboard group.
 */
class DashboardScaPresenceTotalPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ DashboardController::class, 'sca_presence_total' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('sca-presence-total');
    }
}
