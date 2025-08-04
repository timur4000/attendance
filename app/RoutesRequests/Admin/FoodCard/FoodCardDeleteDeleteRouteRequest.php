<?php

namespace App\RoutesRequests\Admin\FoodCard;

use App\Admin\Controllers\FoodCard\FoodCardController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare delete route of food card group.
 */
class FoodCardDeleteDeleteRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ FoodCardController::class, 'delete' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::delete);

        $this->set_identifier('delete');
    }
}
