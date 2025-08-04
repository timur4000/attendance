<?php

namespace App\RoutesRequests\Admin\Orders;

use App\Admin\Controllers\Canteen\Orders\OrdersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare items json route of orders group.
 */
class OrdersItemsJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OrdersController::class, 'items_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('items-json');
    }
}
