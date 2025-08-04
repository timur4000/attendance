<?php

namespace App\RoutesRequests\Admin\Orders;

use App\Admin\Controllers\Canteen\Orders\OrdersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare confirmation route of orders group.
 */
class OrdersConfirmationPutRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OrdersController::class, 'confirmation' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::put);

        $this->set_identifier('confirmation');
    }
}
