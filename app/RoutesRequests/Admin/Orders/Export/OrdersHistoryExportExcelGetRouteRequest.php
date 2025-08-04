<?php

namespace App\RoutesRequests\Admin\Orders\Export;

use App\Admin\Controllers\Canteen\Orders\OrdersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare orders history excel route of orders group.
 */
class OrdersHistoryExportExcelGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OrdersController::class, 'order_history_excel' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('excel');
    }
}
