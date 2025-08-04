<?php

namespace App\RoutesRequests\Admin\Configurations\Values;

use App\Admin\Controllers\Configurations\Values\ValuesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of configuration values group.
 */
class ValuesIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ValuesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
