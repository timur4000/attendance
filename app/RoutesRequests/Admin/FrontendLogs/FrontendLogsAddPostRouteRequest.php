<?php

namespace App\RoutesRequests\Admin\FrontendLogs;

use App\Admin\Controllers\FrontendLogs\FrontendLogsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of frontend logs group.
 */
class FrontendLogsAddPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ FrontendLogsController::class, 'add' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('add');
    }
}
