<?php

namespace App\RoutesRequests\Admin\OrdersList;

use App\Admin\Controllers\Canteen\OrdersList\OrdersListController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of orders list group.
 */
class OrdersListIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OrdersListController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
