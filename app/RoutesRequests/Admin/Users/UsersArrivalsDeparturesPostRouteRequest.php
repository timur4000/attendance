<?php

namespace App\RoutesRequests\Admin\Users;

use App\Admin\Controllers\Users\UsersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare arrivals departures route of users group.
 */
class UsersArrivalsDeparturesPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ UsersController::class, 'arrivals_departures' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('arrivals-departures');
    }
}
