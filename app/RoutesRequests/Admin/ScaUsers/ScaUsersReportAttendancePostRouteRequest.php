<?php

namespace App\RoutesRequests\Admin\ScaUsers;

use App\Admin\Controllers\ScaUsers\ScaUsersController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare report attendance route of sca users group.
 */
class ScaUsersReportAttendancePostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ScaUsersController::class, 'report_attendance' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('report-attendance');
    }
}
