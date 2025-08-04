<?php

namespace App\RoutesRequests\Admin\AdminPermissionGroups;

use App\Admin\Controllers\AdminPermissionGroups\PermissionGroupsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of admin permission groups group.
 */
class AdminPermissionGroupsPutGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PermissionGroupsController::class, 'form' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id?');

        $this->set_identifier('put');
    }
}
