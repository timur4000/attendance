<?php

namespace App\RoutesRequests\Admin\ScaUsers;

use App\Admin\Controllers\ScaUsers\ScaUsersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare food card balance route of sca users group.
 */
class ScaUsersFoodCardBalancePostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaUsersController::class, 'food_card_balance' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('food-card-balance');
    }
}
