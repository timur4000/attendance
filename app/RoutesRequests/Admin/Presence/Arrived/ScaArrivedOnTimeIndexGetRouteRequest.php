<?php

namespace App\RoutesRequests\Admin\Presence\Arrived;

use App\Admin\Controllers\Presence\ArrivedOnTime\ScaArrivedOnTimeController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index arrived on time route of admin group.
 */
class ScaArrivedOnTimeIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaArrivedOnTimeController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
