<?php

namespace App\RoutesRequests\Admin\Canteen\Orders;

use App\Admin\Controllers\Canteen\CanteenController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare orders json route of canteen group.
 */
class CanteenOrdersJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CanteenController::class, 'orders_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('orders-json');
    }
}
