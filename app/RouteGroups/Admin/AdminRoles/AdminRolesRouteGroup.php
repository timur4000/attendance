<?php

namespace App\RouteGroups\Admin\AdminRoles;

use App\RoutesRequests\Admin\AdminRoles\AdminRolesDeleteGetRouteRequest;
use App\RoutesRequests\Admin\AdminRoles\AdminRolesDetailGetRouteRequest;
use App\RoutesRequests\Admin\AdminRoles\AdminRolesIndexGetRouteRequest;
use App\RoutesRequests\Admin\AdminRoles\AdminRolesPutGetRouteRequest;
use App\RoutesRequests\Admin\AdminRoles\AdminRolesPutPatchRouteRequest;
use App\RoutesRequests\Admin\AdminRoles\AdminRolesRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the admin roles.
 */
class AdminRolesRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('admin-roles');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(AdminRolesIndexGetRouteRequest::class);

        $this->call_request(AdminRolesDetailGetRouteRequest::class);

        $this->call_request(AdminRolesPutGetRouteRequest::class);

        $this->call_request(AdminRolesPutPatchRouteRequest::class);

        $this->call_request(AdminRolesDeleteGetRouteRequest::class);

        $this->call_request(AdminRolesRecordsJsonPostRouteRequest::class);
    }
}
