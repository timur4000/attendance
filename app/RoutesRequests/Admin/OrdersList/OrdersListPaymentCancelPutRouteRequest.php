<?php

namespace App\RoutesRequests\Admin\OrdersList;

use App\Admin\Controllers\Canteen\OrdersList\OrdersListController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare payment cancel route of orders list group.
 */
class OrdersListPaymentCancelPutRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OrdersListController::class, 'cancel' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::put);

        $this->set_identifier('cancel');
    }
}
