<?php

namespace App\RoutesRequests\Admin\Classifiers\Unit;

use App\Admin\Controllers\Classifiers\UnitsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units route of admin group.
 */
class UnitGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ UnitsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('units.index');
    }
}
