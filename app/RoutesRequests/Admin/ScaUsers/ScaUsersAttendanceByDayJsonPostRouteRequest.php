<?php

namespace App\RoutesRequests\Admin\ScaUsers;

use App\Admin\Controllers\ScaUsers\ScaUsersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare attendance by day json sca users route of admin group.
 */
class ScaUsersAttendanceByDayJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaUsersController::class, 'attendance_by_day_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('attendance-by-day-json');
    }
}
