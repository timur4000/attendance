<?php

namespace App\RoutesRequests\Admin\Orders;

use App\Admin\Controllers\Canteen\Orders\OrdersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of orders group.
 */
class OrdersIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OrdersController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
