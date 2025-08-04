<?php

namespace App\RouteGroups\Admin\Parameters;

use App\RoutesRequests\Admin\Parameters\ParametersIndexGetRouteRequest;
use App\RoutesRequests\Admin\Parameters\ParametersRecordJsonPostRouteRequest;
use App\RoutesRequests\Admin\Parameters\ParametersRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the parameters.
 */
class ParametersRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('parameters');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ParametersIndexGetRouteRequest::class);

        $this->call_request(ParametersRecordsJsonPostRouteRequest::class);

        $this->call_request(ParametersRecordJsonPostRouteRequest::class);
    }
}
