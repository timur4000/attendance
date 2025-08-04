<?php

namespace App\RoutesRequests\Admin\AdminMenu;


use App\Admin\Controllers\AdminMenu\AdminMenuController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of admin menu group.
 */
class AdminMenuPatchRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AdminMenuController::class, 'patch' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('patch');
    }
}
