<?php

namespace App\RoutesRequests\Admin\Classifiers\Position;

use App\Admin\Controllers\Classifiers\PositionsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units list json route of admin group.
 */
class PositionListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PositionsController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('positions.list.json');
    }
}
