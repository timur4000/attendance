<?php

namespace App\RoutesRequests\Admin\AdminMenu;

use App\Admin\Controllers\AdminMenu\AdminMenuController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of admin menu group.
 */
class AdminMenuIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AdminMenuController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
