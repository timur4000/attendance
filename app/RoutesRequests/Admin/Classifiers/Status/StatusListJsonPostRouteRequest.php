<?php

namespace App\RoutesRequests\Admin\Classifiers\Status;

use App\Admin\Controllers\Classifiers\StatusesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare statuses list json route of admin group.
 */
class StatusListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ StatusesController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('statuses.list.json');
    }
}
