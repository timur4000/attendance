<?php

namespace App\RouteGroups\Admin\Users;

use App\RouteGroups\Admin\Users\Export\UsersArrivalsDeparturesExportRouteGroup;
use App\RoutesRequests\Admin\Users\UsersArrivalsDeparturesPostRouteRequest;
use App\RoutesRequests\Admin\Users\UsersIndexGetRouteRequest;
use App\RoutesRequests\Admin\Users\UsersListJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

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

        $this->call_request(UsersArrivalsDeparturesPostRouteRequest::class);

        $this->call(UsersArrivalsDeparturesExportRouteGroup::class);
    }
}
