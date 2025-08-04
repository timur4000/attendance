<?php

namespace App\RoutesRequests\Admin\Users\Export;

use App\Admin\Controllers\Users\UsersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare excel route of users arrivals and departures group.
 */
class UsersArrivalsDeparturesExportExcelGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ UsersController::class, 'arrivals_departures_excel' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('arrivals-departures-excel');
    }
}
