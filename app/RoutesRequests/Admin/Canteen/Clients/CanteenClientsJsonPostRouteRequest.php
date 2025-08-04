<?php

namespace App\RoutesRequests\Admin\Canteen\Clients;

use App\Admin\Controllers\Canteen\CanteenController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare clients json route of canteen group.
 */
class CanteenClientsJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CanteenController::class, 'clients_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('clients-json');
    }
}
