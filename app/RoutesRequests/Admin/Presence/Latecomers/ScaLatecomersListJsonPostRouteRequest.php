<?php

namespace App\RoutesRequests\Admin\Presence\Latecomers;

use App\Admin\Controllers\Presence\Latecomers\ScaLatecomersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare list json users route of admin group.
 */
class ScaLatecomersListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaLatecomersController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('list_json');
    }
}
