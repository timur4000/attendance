<?php

namespace App\RoutesRequests\Admin\Configurations\Values;

use App\Admin\Controllers\Configurations\Values\ValuesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare record json route of configuration values group.
 */
class ValuesRecordJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ValuesController::class, 'record_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('record-json');
    }
}
