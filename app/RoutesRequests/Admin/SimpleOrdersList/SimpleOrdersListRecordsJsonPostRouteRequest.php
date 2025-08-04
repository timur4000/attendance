<?php

namespace App\RoutesRequests\Admin\SimpleOrdersList;

use App\Admin\Controllers\SimpleOrdersList\SimpleOrdersListController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare records json route of simple orders list group.
 */
class SimpleOrdersListRecordsJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ SimpleOrdersListController::class, 'records_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('records-json');
    }
}
