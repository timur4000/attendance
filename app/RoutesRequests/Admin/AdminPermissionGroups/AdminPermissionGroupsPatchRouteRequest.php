<?php

namespace App\RoutesRequests\Admin\AdminPermissionGroups;


use App\Admin\Controllers\AdminPermissionGroups\PermissionGroupsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of admin permission groups group.
 */
class AdminPermissionGroupsPatchRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PermissionGroupsController::class, 'patch' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('patch');
    }
}
