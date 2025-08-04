<?php

namespace App\RoutesRequests\Admin\OrdersList;

use App\Admin\Controllers\Canteen\OrdersList\OrdersListController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare delete route of orders list group.
 */
class OrdersListDeleteDeleteRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OrdersListController::class, 'delete' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::delete);

        $this->set_identifier('delete');
    }
}
