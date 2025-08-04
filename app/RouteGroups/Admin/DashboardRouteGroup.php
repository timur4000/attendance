<?php

namespace App\RouteGroups\Admin;

use App\RoutesRequests\Admin\Dashboard\IndexGetRouteRequest;
use App\Standards\Abstracts\RouteGroup\RouteGroup;

class DashboardRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('dashboard');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(IndexGetRouteRequest::class);
    }
}
