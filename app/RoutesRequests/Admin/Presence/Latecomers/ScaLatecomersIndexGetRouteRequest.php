<?php

namespace App\RoutesRequests\Admin\Presence\Latecomers;

use App\Admin\Controllers\Presence\Latecomers\ScaLatecomersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index users route of admin group.
 */
class ScaLatecomersIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaLatecomersController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
