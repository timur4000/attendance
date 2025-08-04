<?php

namespace App\RoutesRequests\Admin\Users;

use App\Admin\Controllers\Users\UsersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index users route of admin group.
 */
class UsersIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ UsersController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
