<?php

namespace App\RoutesRequests\Admin\HttpMethods;

use App\Admin\Controllers\HttpMethods\HttpMethodsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare detail route of http methods group.
 */
class HttpMethodsDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ HttpMethodsController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('detail');
    }
}
