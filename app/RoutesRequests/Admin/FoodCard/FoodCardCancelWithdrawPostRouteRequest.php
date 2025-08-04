<?php

namespace App\RoutesRequests\Admin\FoodCard;

use App\Admin\Controllers\FoodCard\FoodCardController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare cancel withdraw post route of food card group.
 */
class FoodCardCancelWithdrawPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ FoodCardController::class, 'cancel_withdraw' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('cancel-withdraw');
    }
}
