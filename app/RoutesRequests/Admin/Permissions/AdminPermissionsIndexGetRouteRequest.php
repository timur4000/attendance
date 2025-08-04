<?php

namespace App\RoutesRequests\Admin\Permissions;

use App\Admin\Controllers\Permissions\PermissionsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of admin permissions group.
 */
class AdminPermissionsIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PermissionsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
