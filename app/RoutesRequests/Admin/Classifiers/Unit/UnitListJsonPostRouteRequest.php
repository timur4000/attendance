<?php

namespace App\RoutesRequests\Admin\Classifiers\Unit;

use App\Admin\Controllers\Classifiers\UnitsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units list json route of admin group.
 */
class UnitListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ UnitsController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('units.list.json');
    }
}
