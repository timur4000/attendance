<?php

namespace App\RoutesRequests\Admin\AdminPermissionGroups;

use App\Admin\Controllers\AdminPermissionGroups\PermissionGroupsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare delete route of admin permission groups group.
 */
class AdminPermissionGroupsDeleteGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PermissionGroupsController::class, 'delete' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('delete');
    }
}
