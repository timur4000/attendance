<?php

namespace App\RoutesRequests\Admin\HttpMethods;

use App\Admin\Controllers\HttpMethods\HttpMethodsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of http methods group.
 */
class HttpMethodsPutPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ HttpMethodsController::class, 'put' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('put');
    }
}
