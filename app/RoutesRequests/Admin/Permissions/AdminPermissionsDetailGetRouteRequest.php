<?php

namespace App\RoutesRequests\Admin\Permissions;

use App\Admin\Controllers\Permissions\PermissionsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare detail route of admin permissions group.
 */
class AdminPermissionsDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PermissionsController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('detail');
    }
}
