<?php

namespace App\RoutesRequests\Admin\AdminRoles;

use App\Admin\Controllers\AdminRoles\AdminRolesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of admin roles group.
 */
class AdminRolesIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AdminRolesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
