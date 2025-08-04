<?php

namespace App\RoutesRequests\Admin\AdminPermissionGroups;

use App\Admin\Controllers\AdminPermissionGroups\PermissionGroupsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare detail route of admin permission groups group.
 */
class AdminPermissionGroupsDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PermissionGroupsController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('detail');
    }
}
