<?php

namespace App\RoutesRequests\Admin\Classifiers\Role;

use App\Admin\Controllers\Classifiers\RolesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare roles route of admin group.
 */
class RoleGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ RolesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('roles.index');
    }
}
