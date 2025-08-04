<?php

namespace App\RoutesRequests\Admin\SimpleOrders;

use App\Admin\Controllers\SimpleOrders\SimpleOrdersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of simple orders group.
 */
class SimpleOrdersIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ SimpleOrdersController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
