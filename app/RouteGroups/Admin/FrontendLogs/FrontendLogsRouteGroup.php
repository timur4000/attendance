<?php

namespace App\RouteGroups\Admin\FrontendLogs;

use App\RoutesRequests\Admin\FrontendLogs\FrontendLogsAddPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the frontend logs.
 */
class FrontendLogsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('frontend-logs');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(FrontendLogsAddPostRouteRequest::class);
    }
}
