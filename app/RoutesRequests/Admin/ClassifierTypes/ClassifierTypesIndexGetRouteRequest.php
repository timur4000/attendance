<?php

namespace App\RoutesRequests\Admin\ClassifierTypes;

use App\Admin\Controllers\ClassifierTypes\ClassifierTypesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index classifier types route of admin group.
 */
class ClassifierTypesIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ClassifierTypesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
