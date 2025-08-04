<?php

namespace App\RouteGroups\Admin\Configurations\Types;

use App\RoutesRequests\Admin\Configurations\Types\TypesDeleteGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Types\TypesDetailGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Types\TypesIndexGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Types\TypesPutGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Types\TypesPutPostRouteRequest;
use App\RoutesRequests\Admin\Configurations\Types\TypesRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;


/**
 * Implements declare route group for the configuration types.
 */
class ConfigurationTypesRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('types');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(TypesIndexGetRouteRequest::class);

        $this->call_request(TypesRecordsJsonPostRouteRequest::class);

        $this->call_request(TypesDetailGetRouteRequest::class);

        $this->call_request(TypesPutGetRouteRequest::class);

        $this->call_request(TypesPutPostRouteRequest::class);

        $this->call_request(TypesDeleteGetRouteRequest::class);
    }
}
