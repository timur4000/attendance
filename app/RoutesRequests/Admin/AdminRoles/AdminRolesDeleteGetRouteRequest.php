<?php

namespace App\RoutesRequests\Admin\AdminRoles;

use App\Admin\Controllers\AdminRoles\AdminRolesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare delete route of admin roles group.
 */
class AdminRolesDeleteGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AdminRolesController::class, 'delete' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('delete');
    }
}
