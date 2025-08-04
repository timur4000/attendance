<?php

namespace App\RouteGroups\Admin\Orders\Exports;

use App\RoutesRequests\Admin\Orders\Export\OrdersHistoryExportExcelGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the orders history export.
 */
class OrdersHistoryExportRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('export');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(OrdersHistoryExportExcelGetRouteRequest::class);
    }
}
