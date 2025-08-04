<?php

namespace App\RouteGroups\Admin\Authorization;

use App\RoutesRequests\Admin\Authorization\AuthorizationLoginGetRouteRequest;
use App\RoutesRequests\Admin\Authorization\AuthorizationLoginPostRouteRequest;
use App\RoutesRequests\Admin\Authorization\AuthorizationLogoutPostRouteRequest;
use App\Standards\Classifiers\Middlewares\MiddlewareClassifiers;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

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

        $this->add_ignored_middleware(MiddlewareClassifiers::admin_roles);

        $this->add_ignored_middleware(MiddlewareClassifiers::admin_operation_logs);

        $this->add_ignored_middleware(MiddlewareClassifiers::admin_access_key_middleware);
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    function callable(): void
    {
        $this->call_request(AuthorizationLoginGetRouteRequest::class);

        $this->call_request(AuthorizationLoginPostRouteRequest::class);

        $this->call_request(AuthorizationLogoutPostRouteRequest::class);
    }
}
