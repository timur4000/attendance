<?php

namespace App\RoutesRequests\Admin\Configurations\Groups;

use App\Admin\Controllers\Configurations\Groups\GroupsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of configuration groups group.
 */
class GroupsIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ GroupsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
