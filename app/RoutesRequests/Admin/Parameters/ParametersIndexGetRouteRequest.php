<?php

namespace App\RoutesRequests\Admin\Parameters;

use App\Admin\Controllers\Parameters\ParametersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of parameters group.
 */
class ParametersIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ParametersController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
