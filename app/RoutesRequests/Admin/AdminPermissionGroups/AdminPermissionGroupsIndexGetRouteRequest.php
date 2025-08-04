<?php

namespace App\RoutesRequests\Admin\AdminPermissionGroups;

use App\Admin\Controllers\AdminPermissionGroups\PermissionGroupsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of admin permission groups group.
 */
class AdminPermissionGroupsIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PermissionGroupsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
