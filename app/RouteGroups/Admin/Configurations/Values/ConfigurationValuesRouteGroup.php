<?php

namespace App\RouteGroups\Admin\Configurations\Values;

use App\RoutesRequests\Admin\Configurations\Values\ValuesDeleteGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Values\ValuesDetailGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Values\ValuesIndexGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Values\ValuesPutGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Values\ValuesPutPostRouteRequest;
use App\RoutesRequests\Admin\Configurations\Values\ValuesRecordJsonPostRouteRequest;
use App\RoutesRequests\Admin\Configurations\Values\ValuesRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the configuration values.
 */
class ConfigurationValuesRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('values');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ValuesIndexGetRouteRequest::class);

        $this->call_request(ValuesRecordsJsonPostRouteRequest::class);

        $this->call_request(ValuesRecordJsonPostRouteRequest::class);

        $this->call_request(ValuesDetailGetRouteRequest::class);

        $this->call_request(ValuesPutGetRouteRequest::class);

        $this->call_request(ValuesPutPostRouteRequest::class);

        $this->call_request(ValuesDeleteGetRouteRequest::class);
    }
}
