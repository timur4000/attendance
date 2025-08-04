<?php

namespace App\RoutesRequests\Admin\AdminRoles;

use App\Admin\Controllers\AdminRoles\AdminRolesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of admin roles group.
 */
class AdminRolesPutGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AdminRolesController::class, 'form' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id?');

        $this->set_identifier('put');
    }
}
