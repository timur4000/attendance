<?php

namespace App\RouteGroups\Admin\SimpleOrdersList;

use App\RoutesRequests\Admin\SimpleOrdersList\SimpleOrdersListExistPostRouteRequest;
use App\RoutesRequests\Admin\SimpleOrdersList\SimpleOrdersListIndexGetRouteRequest;
use App\RoutesRequests\Admin\SimpleOrdersList\SimpleOrdersListRecordsJsonPostRouteRequest;
use App\RoutesRequests\Admin\SimpleOrdersList\SimpleOrdersListRemovePostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the simple orders list.
 */
class SimpleOrdersListRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('simple-orders-list');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(SimpleOrdersListIndexGetRouteRequest::class);

        $this->call_request(SimpleOrdersListRecordsJsonPostRouteRequest::class);

        $this->call_request(SimpleOrdersListRemovePostRouteRequest::class);

        $this->call_request(SimpleOrdersListExistPostRouteRequest::class);
    }
}
