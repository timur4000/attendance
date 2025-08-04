<?php

namespace App\RouteGroups\Admin\HttpMethods;

use App\RoutesRequests\Admin\HttpMethods\HttpMethodsDeleteGetRouteRequest;
use App\RoutesRequests\Admin\HttpMethods\HttpMethodsDetailGetRouteRequest;
use App\RoutesRequests\Admin\HttpMethods\HttpMethodsPutGetRouteRequest;
use App\RoutesRequests\Admin\HttpMethods\HttpMethodsPutPostRouteRequest;
use App\RoutesRequests\Admin\HttpMethods\HttpMethodsIndexGetRouteRequest;
use App\RoutesRequests\Admin\HttpMethods\HttpMethodsRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the http methods.
 */
class HttpMethodsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('http-methods');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(HttpMethodsIndexGetRouteRequest::class);

        $this->call_request(HttpMethodsPutPostRouteRequest::class);

        $this->call_request(HttpMethodsPutGetRouteRequest::class);

        $this->call_request(HttpMethodsDeleteGetRouteRequest::class);

        $this->call_request(HttpMethodsDetailGetRouteRequest::class);

        $this->call_request(HttpMethodsRecordsJsonPostRouteRequest::class);
    }
}
