<?php

namespace App\RoutesRequests\Admin\Classifiers\Position;

use App\Admin\Controllers\Classifiers\PositionsController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units route of admin group.
 */
class PositionDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PositionsController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable(CommonTermClassifier::DETAIL->value);

        $this->set_identifier('positions.detail');
    }
}
