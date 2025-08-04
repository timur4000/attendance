<?php

namespace App\RoutesRequests\Admin\SimpleOrdersList;

use App\Admin\Controllers\SimpleOrdersList\SimpleOrdersListController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of simple orders list group.
 */
class SimpleOrdersListIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ SimpleOrdersListController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
