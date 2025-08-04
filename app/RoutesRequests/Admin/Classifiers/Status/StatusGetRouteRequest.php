<?php

namespace App\RoutesRequests\Admin\Classifiers\Status;

use App\Admin\Controllers\Classifiers\StatusesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare statuses route of admin group.
 */
class StatusGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ StatusesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('statuses.index');
    }
}
