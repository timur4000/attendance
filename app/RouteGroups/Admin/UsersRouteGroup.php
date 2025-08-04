<?php

namespace App\RouteGroups\Admin;

use App\RoutesRequests\Admin\Users\UsersIndexGetRouteRequest;
use App\RoutesRequests\Admin\Users\UsersListJsonPostRouteRequest;
use App\Standards\Abstracts\RouteGroup\RouteGroup;

/**
 * Implements declare route group for the users.
 */
class UsersRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('users');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(UsersIndexGetRouteRequest::class);

        $this->call_request(UsersListJsonPostRouteRequest::class);
    }
}
