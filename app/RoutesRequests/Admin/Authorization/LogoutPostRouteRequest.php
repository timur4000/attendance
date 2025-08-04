<?php

namespace App\RoutesRequests\Admin\Authorization;

use App\Admin\Controllers\Authorization\LogoutController;
use App\Standards\Abstracts\RoutesRequests\RouteRequest;
use App\Standards\Classifiers\Middlewares\MiddlewareClassifiers;

/**
 * Implements declare logout route of authorization group.
 */
class LogoutPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array
     */
    protected array $action = [ LogoutController::class, 'handle' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('logout');

        $this->add_ignored_middleware(MiddlewareClassifiers::admin_before_authorization);
    }
}
