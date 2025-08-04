<?php

namespace App\RouteGroups\Admin\Prices\Food;

use App\RoutesRequests\Admin\Prices\Food\FoodIndexGetRouteRequest;
use App\RoutesRequests\Admin\Prices\Food\FoodListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Prices\Food\FoodUpdatePostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the food.
 */
class FoodRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('food');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(FoodIndexGetRouteRequest::class);

        $this->call_request(FoodUpdatePostRouteRequest::class);

        $this->call_request(FoodListJsonPostRouteRequest::class);
    }
}
