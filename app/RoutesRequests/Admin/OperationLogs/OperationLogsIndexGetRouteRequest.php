<?php

namespace App\RoutesRequests\Admin\OperationLogs;

use App\Admin\Controllers\OperationLogs\OperationLogsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of operation logs group.
 */
class OperationLogsIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OperationLogsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
