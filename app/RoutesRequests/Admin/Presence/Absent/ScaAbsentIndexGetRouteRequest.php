<?php

namespace App\RoutesRequests\Admin\Presence\Absent;

use App\Admin\Controllers\Presence\Absent\ScaAbsentController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of absent group.
 */
class ScaAbsentIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaAbsentController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
