<?php

namespace App\RouteGroups\Admin\OrdersList;

use App\RoutesRequests\Admin\OrdersList\OrdersListChangePatchRouteRequest;
use App\RoutesRequests\Admin\OrdersList\OrdersListDeleteDeleteRouteRequest;
use App\RoutesRequests\Admin\OrdersList\OrdersListIndexGetRouteRequest;
use App\RoutesRequests\Admin\OrdersList\OrdersListPaymentCancelPutRouteRequest;
use App\RoutesRequests\Admin\OrdersList\OrdersListPaymentPutRouteRequest;
use App\RoutesRequests\Admin\OrdersList\OrdersListRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the orders list.
 */
class OrdersListRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('orders-list');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(OrdersListIndexGetRouteRequest::class);

        $this->call_request(OrdersListRecordsJsonPostRouteRequest::class);

        $this->call_request(OrdersListDeleteDeleteRouteRequest::class);

        $this->call_request(OrdersListPaymentPutRouteRequest::class);

        $this->call_request(OrdersListPaymentCancelPutRouteRequest::class);

        $this->call_request(OrdersListChangePatchRouteRequest::class);
    }
}
