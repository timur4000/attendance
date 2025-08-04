<?php

namespace App\RoutesRequests\Admin\ScaUsers;

use App\Admin\Controllers\ScaUsers\ScaUsersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare detail sca users route of admin group.
 */
class ScaUsersDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaUsersController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('detail');
    }
}
