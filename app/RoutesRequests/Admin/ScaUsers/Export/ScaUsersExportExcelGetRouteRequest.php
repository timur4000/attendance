<?php

namespace App\RoutesRequests\Admin\ScaUsers\Export;

use App\Admin\Controllers\ScaUsers\ScaUsersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare excel route of sca users export group.
 */
class ScaUsersExportExcelGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaUsersController::class, 'excel' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('excel');
    }
}
