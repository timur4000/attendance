<?php

namespace App\RouteGroups\Admin\Presence;

use App\RoutesRequests\Admin\Presence\Absent\ScaAbsentIndexGetRouteRequest;
use App\RoutesRequests\Admin\Presence\Absent\ScaAbsentListJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the absent.
 */
class AbsentRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('absent');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ScaAbsentIndexGetRouteRequest::class);

        $this->call_request(ScaAbsentListJsonPostRouteRequest::class);
    }
}
