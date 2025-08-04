<?php

namespace App\RouteGroups\Admin\OperationLogs;

use App\RoutesRequests\Admin\OperationLogs\OperationLogsIndexGetRouteRequest;
use App\RoutesRequests\Admin\OperationLogs\OperationLogsRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the operation logs.
 */
class OperationLogsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('operation-logs');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(OperationLogsIndexGetRouteRequest::class);

        $this->call_request(OperationLogsRecordsJsonPostRouteRequest::class);
    }
}
