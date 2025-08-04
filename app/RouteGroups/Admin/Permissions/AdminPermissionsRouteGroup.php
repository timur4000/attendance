<?php

namespace App\RouteGroups\Admin\Permissions;

use App\RoutesRequests\Admin\Permissions\AdminPermissionsDeleteGetRouteRequest;
use App\RoutesRequests\Admin\Permissions\AdminPermissionsPutGetRouteRequest;
use App\RoutesRequests\Admin\Permissions\AdminPermissionsPutPatchRouteRequest;
use App\RoutesRequests\Admin\Permissions\AdminPermissionsDetailGetRouteRequest;
use App\RoutesRequests\Admin\Permissions\AdminPermissionsIndexGetRouteRequest;
use App\RoutesRequests\Admin\Permissions\AdminPermissionsRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the admin permissions.
 */
class AdminPermissionsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('admin-permissions');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(AdminPermissionsIndexGetRouteRequest::class);

        $this->call_request(AdminPermissionsDetailGetRouteRequest::class);

        $this->call_request(AdminPermissionsPutGetRouteRequest::class);

        $this->call_request(AdminPermissionsPutPatchRouteRequest::class);

        $this->call_request(AdminPermissionsDeleteGetRouteRequest::class);

        $this->call_request(AdminPermissionsRecordsJsonPostRouteRequest::class);
    }
}
