<?php

namespace App\RouteGroups\Admin\SimpleOrders;

use App\RoutesRequests\Admin\SimpleOrders\SimpleOrdersConfirmationPutRouteRequest;
use App\RoutesRequests\Admin\SimpleOrders\SimpleOrdersIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the simple orders.
 */
class SimpleOrdersRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('simple-orders');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(SimpleOrdersIndexGetRouteRequest::class);

        $this->call_request(SimpleOrdersConfirmationPutRouteRequest::class);
    }
}
