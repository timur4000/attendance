<?php

namespace App\RoutesRequests\Admin\Classifiers\Position;

use App\Admin\Controllers\Classifiers\PositionsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units route of admin group.
 */
class PositionGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PositionsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('positions.index');
    }
}
