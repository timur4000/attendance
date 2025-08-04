<?php

namespace App\RoutesRequests\Admin\SimpleOrders;

use App\Admin\Controllers\SimpleOrders\SimpleOrdersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare confirmation route of simple orders group.
 */
class SimpleOrdersConfirmationPutRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ SimpleOrdersController::class, 'confirmation' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::put);

        $this->set_identifier('confirmation');
    }
}
