<?php

namespace App\RoutesRequests\Admin\Classifiers\Food;

use App\Admin\Controllers\Classifiers\FoodController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units route of admin group.
 */
class FoodGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ FoodController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('food.index');
    }
}
