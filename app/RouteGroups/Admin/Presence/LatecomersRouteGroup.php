<?php

namespace App\RouteGroups\Admin\Presence;

use App\RoutesRequests\Admin\Presence\Latecomers\ScaLatecomersIndexGetRouteRequest;
use App\RoutesRequests\Admin\Presence\Latecomers\ScaLatecomersListJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the latecomers.
 */
class LatecomersRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('latecomers');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ScaLatecomersIndexGetRouteRequest::class);

        $this->call_request(ScaLatecomersListJsonPostRouteRequest::class);
    }
}
