<?php

namespace App\RouteGroups\Admin;

use App\RoutesRequests\Admin\ClassifierTypes\ClassifierTypesDetailGetRouteRequest;
use App\RoutesRequests\Admin\ClassifierTypes\ClassifierTypesIndexGetRouteRequest;
use App\RoutesRequests\Admin\ClassifierTypes\ClassifierTypesListJsonPostRouteRequest;
use App\Standards\Abstracts\RouteGroup\RouteGroup;

/**
 * Implements declare route group for the classifier types.
 */
class ClassifierTypesRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('classifier-types');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ClassifierTypesIndexGetRouteRequest::class);

        $this->call_request(ClassifierTypesListJsonPostRouteRequest::class);

        $this->call_request(ClassifierTypesDetailGetRouteRequest::class);
    }
}
