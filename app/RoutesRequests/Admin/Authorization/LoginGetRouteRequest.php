<?php

namespace App\RoutesRequests\Admin\Authorization;

use App\Admin\Controllers\Authorization\LoginController;
use App\Standards\Abstracts\RoutesRequests\RouteRequest;

/**
 * Implements declare login route of authorization group.
 */
class LoginGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array
     */
    protected array $action = [ LoginController::class, 'view' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('login');
    }
}
