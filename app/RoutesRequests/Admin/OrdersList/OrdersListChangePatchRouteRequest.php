<?php

namespace App\RoutesRequests\Admin\OrdersList;

use App\Admin\Controllers\Canteen\OrdersList\OrdersListController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare change route of orders list group.
 */
class OrdersListChangePatchRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OrdersListController::class, 'change' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::patch);

        $this->set_identifier('change');
    }
}
