<?php

namespace App\RoutesRequests\Admin\Dashboard;

use App\Admin\Controllers\Dashboard\DashboardController;
use App\Standards\Abstracts\RoutesRequests\RouteRequest;

/**
 * Implements declare dashboard route of admin group.
 */
class IndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ DashboardController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
