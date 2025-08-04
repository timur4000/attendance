<?php

namespace App\RoutesRequests\Admin\OperationLogs;

use App\Admin\Controllers\OperationLogs\OperationLogsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare records json route of operation logs group.
 */
class OperationLogsRecordsJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ OperationLogsController::class, 'records_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('records-json');
    }
}
