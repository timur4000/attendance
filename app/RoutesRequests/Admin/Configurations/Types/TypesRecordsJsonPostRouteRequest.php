<?php

namespace App\RoutesRequests\Admin\Configurations\Types;

use App\Admin\Controllers\Configurations\Types\TypesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare records json route of configuration types group.
 */
class TypesRecordsJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TypesController::class, 'records_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('records-json');
    }
}
