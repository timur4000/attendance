<?php

namespace App\RouteGroups\Admin\AdminPermissionGroups;

use App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsDeleteGetRouteRequest;
use App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsDetailGetRouteRequest;
use App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsIndexGetRouteRequest;
use App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsPutGetRouteRequest;
use App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsPatchRouteRequest;
use App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the admin permission groups.
 */
class AdminPermissionGroupsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('admin-permission-groups');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(AdminPermissionGroupsIndexGetRouteRequest::class);

        $this->call_request(AdminPermissionGroupsDetailGetRouteRequest::class);

        $this->call_request(AdminPermissionGroupsPatchRouteRequest::class);

        $this->call_request(AdminPermissionGroupsPutGetRouteRequest::class);

        $this->call_request(AdminPermissionGroupsDeleteGetRouteRequest::class);

        $this->call_request(AdminPermissionGroupsRecordsJsonPostRouteRequest::class);
    }
}
