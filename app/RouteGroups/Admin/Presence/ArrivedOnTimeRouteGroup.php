<?php

namespace App\RouteGroups\Admin\Presence;

use App\RoutesRequests\Admin\Presence\Arrived\ScaArrivedOnTimeIndexGetRouteRequest;
use App\RoutesRequests\Admin\Presence\Arrived\ScaArrivedOnTimeListJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the arrived on time.
 */
class ArrivedOnTimeRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('arrived-on-time');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ScaArrivedOnTimeIndexGetRouteRequest::class);

        $this->call_request(ScaArrivedOnTimeListJsonPostRouteRequest::class);
    }
}
