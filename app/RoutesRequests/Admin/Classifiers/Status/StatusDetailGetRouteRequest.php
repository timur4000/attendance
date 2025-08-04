<?php

namespace App\RoutesRequests\Admin\Classifiers\Status;

use App\Admin\Controllers\Classifiers\StatusesController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare statuses route of admin group.
 */
class StatusDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ StatusesController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable(CommonTermClassifier::DETAIL->value);

        $this->set_identifier('statuses.detail');
    }
}
