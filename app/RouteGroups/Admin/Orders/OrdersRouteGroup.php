<?php

namespace App\RouteGroups\Admin\Orders;

use App\RouteGroups\Admin\Orders\Exports\OrdersHistoryExportRouteGroup;
use App\RoutesRequests\Admin\Orders\OrdersConfirmationPutRouteRequest;
use App\RoutesRequests\Admin\Orders\OrdersIndexGetRouteRequest;
use App\RoutesRequests\Admin\Orders\OrdersItemsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the orders.
 */
class OrdersRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('orders');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(OrdersIndexGetRouteRequest::class);

        $this->call_request(OrdersItemsJsonPostRouteRequest::class);

        $this->call_request(OrdersConfirmationPutRouteRequest::class);

        $this->call(OrdersHistoryExportRouteGroup::class);
    }
}
