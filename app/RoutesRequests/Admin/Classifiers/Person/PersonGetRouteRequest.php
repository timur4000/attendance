<?php

namespace App\RoutesRequests\Admin\Classifiers\Person;

use App\Admin\Controllers\Classifiers\PersonsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare person categories route of admin group.
 */
class PersonGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PersonsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('person-categories.index');
    }
}
