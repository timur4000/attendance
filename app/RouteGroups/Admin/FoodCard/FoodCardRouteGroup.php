<?php

namespace App\RouteGroups\Admin\FoodCard;

use App\RouteGroups\Admin\FoodCard\Export\FoodCardExportRouteGroup;
use App\RoutesRequests\Admin\FoodCard\FoodCardCancelWithdrawPostRouteRequest;
use App\RoutesRequests\Admin\FoodCard\FoodCardDeleteDeleteRouteRequest;
use App\RoutesRequests\Admin\FoodCard\FoodCardPatchPostRouteRequest;
use App\RoutesRequests\Admin\FoodCard\FoodCardWithdrawPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the food card.
 */
class FoodCardRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('food-card');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(FoodCardPatchPostRouteRequest::class);

        $this->call_request(FoodCardDeleteDeleteRouteRequest::class);

        $this->call_request(FoodCardWithdrawPostRouteRequest::class);

        $this->call_request(FoodCardCancelWithdrawPostRouteRequest::class);

        $this->call(FoodCardExportRouteGroup::class);
    }
}
