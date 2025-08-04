<?php

namespace App\RoutesRequests\Admin\Prices\Food;

use App\Admin\Controllers\Prices\Food\FoodController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index food route of admin group.
 */
class FoodIndexGetRouteRequest extends RouteRequest
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

        $this->set_identifier('index');
    }
}
