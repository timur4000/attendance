<?php

namespace App\RoutesRequests\Admin\AdminMenu;

use App\Admin\Controllers\AdminMenu\AdminMenuController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare detail route of admin menu group.
 */
class AdminMenuDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AdminMenuController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('detail');
    }
}
