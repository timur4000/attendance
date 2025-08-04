<?php

namespace App\RoutesRequests\Admin\SimpleOrdersList;

use App\Admin\Controllers\SimpleOrdersList\SimpleOrdersListController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare remove route of simple orders list group.
 */
class SimpleOrdersListRemovePostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ SimpleOrdersListController::class, 'remove' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('remove');
    }
}
