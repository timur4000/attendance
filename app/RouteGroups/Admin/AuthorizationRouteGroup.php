<?php

namespace App\RouteGroups\Admin;

use App\RoutesRequests\Admin\Authorization\LoginGetRouteRequest;
use App\RoutesRequests\Admin\Authorization\LoginPostRouteRequest;
use App\RoutesRequests\Admin\Authorization\LogoutPostRouteRequest;
use App\Standards\Abstracts\RouteGroup\RouteGroup;
use App\Standards\Classifiers\Middlewares\MiddlewareClassifiers;

/**
 * Declares group for admin authorization routes.
 */
class AuthorizationRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('authorization');

        $this->add_middleware(MiddlewareClassifiers::admin_before_authorization);

        $this->add_ignored_middleware(MiddlewareClassifiers::admin_authorization);
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    function callable(): void
    {
        $this->call_request(LoginGetRouteRequest::class);

        $this->call_request(LoginPostRouteRequest::class);

        $this->call_request(LogoutPostRouteRequest::class);
    }
}
