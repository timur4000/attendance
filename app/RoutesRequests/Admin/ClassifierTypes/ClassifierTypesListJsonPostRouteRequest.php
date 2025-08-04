<?php

namespace App\RoutesRequests\Admin\ClassifierTypes;

use App\Admin\Controllers\ClassifierTypes\ClassifierTypesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare list json classifier types route of admin group.
 */
class ClassifierTypesListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ClassifierTypesController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('list-json');
    }
}
