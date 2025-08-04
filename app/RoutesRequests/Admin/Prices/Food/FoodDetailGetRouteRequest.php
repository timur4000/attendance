<?php

namespace App\RoutesRequests\Admin\Prices\Food;

use App\Admin\Controllers\Prices\Food\FoodController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index food route of admin group.
 */
class FoodDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ FoodController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('record_id');

        $this->set_identifier(CommonTermClassifier::DETAIL->value);
    }
}
