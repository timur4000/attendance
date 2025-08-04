<?php

namespace App\RoutesRequests\Admin\Classifiers\Person;

use App\Admin\Controllers\Classifiers\PersonsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare person categories list json route of admin group.
 */
class PersonListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PersonsController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('person-categories.list.json');
    }
}
