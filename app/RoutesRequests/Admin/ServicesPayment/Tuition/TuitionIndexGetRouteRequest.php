<?php

namespace App\RoutesRequests\Admin\ServicesPayment\Tuition;

use App\Admin\Controllers\ServicesPayment\Tuition\TuitionController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index tuition route of admin group.
 */
class TuitionIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TuitionController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
