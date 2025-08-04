<?php

namespace App\RoutesRequests\Admin\Authorization;

use App\Admin\Controllers\Authorization\LoginController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare login route of authorization group.
 */
class AuthorizationLoginPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array
     */
    protected array $action = [ LoginController::class, 'handle' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('login');

        $this->set_method(RouteMethodsClassifiers::post);
    }
}
