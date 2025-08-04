<?php

namespace App\RouteGroups\Admin\AdminMenu;

use App\RoutesRequests\Admin\AdminMenu\AdminMenuDeleteGetRouteRequest;
use App\RoutesRequests\Admin\AdminMenu\AdminMenuDetailGetRouteRequest;
use App\RoutesRequests\Admin\AdminMenu\AdminMenuIndexGetRouteRequest;
use App\RoutesRequests\Admin\AdminMenu\AdminMenuPatchRouteRequest;
use App\RoutesRequests\Admin\AdminMenu\AdminMenuPutGetRouteRequest;
use App\RoutesRequests\Admin\AdminMenu\AdminMenuRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the admin menu groups.
 */
class AdminMenuRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('admin-menu');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(AdminMenuIndexGetRouteRequest::class);

        $this->call_request(AdminMenuDetailGetRouteRequest::class);

        $this->call_request(AdminMenuPatchRouteRequest::class);

        $this->call_request(AdminMenuPutGetRouteRequest::class);

        $this->call_request(AdminMenuDeleteGetRouteRequest::class);

        $this->call_request(AdminMenuRecordsJsonPostRouteRequest::class);
    }
}
