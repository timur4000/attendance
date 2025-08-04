<?php

namespace App\RoutesRequests\Admin\Configurations\Groups;

use App\Admin\Controllers\Configurations\Groups\GroupsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of configuration groups group.
 */
class GroupsPutGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ GroupsController::class, 'form' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id?');

        $this->set_identifier('put');
    }
}
