<?php

namespace App\RoutesRequests\Admin\HttpMethods;

use App\Admin\Controllers\HttpMethods\HttpMethodsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of http methods group.
 */
class HttpMethodsPutGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ HttpMethodsController::class, 'form' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id?');

        $this->set_identifier('put');
    }
}
