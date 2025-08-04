<?php

namespace App\RoutesRequests\Admin\Parameters;

use App\Admin\Controllers\Parameters\ParametersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare record json route of parameters group.
 */
class ParametersRecordJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ParametersController::class, 'record_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('record-json');
    }
}
