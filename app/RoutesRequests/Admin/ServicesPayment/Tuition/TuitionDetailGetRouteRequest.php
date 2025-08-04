<?php

namespace App\RoutesRequests\Admin\ServicesPayment\Tuition;

use App\Admin\Controllers\ServicesPayment\Tuition\TuitionController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index tuition route of admin group.
 */
class TuitionDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TuitionController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('user_id');

        $this->set_identifier('detail');
    }
}
