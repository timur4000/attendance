<?php

namespace App\RoutesRequests\Admin\Prices\Food;

use App\Admin\Controllers\Prices\Food\FoodController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare update food route of admin group.
 */
class FoodUpdatePostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ FoodController::class, 'update' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('update');
    }
}
