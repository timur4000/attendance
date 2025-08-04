<?php

namespace App\RoutesRequests\Admin\HttpMethods;

use App\Admin\Controllers\HttpMethods\HttpMethodsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of http methods group.
 */
class HttpMethodsIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ HttpMethodsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
