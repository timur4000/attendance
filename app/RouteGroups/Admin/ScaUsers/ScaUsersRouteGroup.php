<?php

namespace App\RouteGroups\Admin\ScaUsers;

use App\RoutesRequests\Admin\ScaUsers\ScaUsersAttendanceByDayJsonPostRouteRequest;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersDetailGetRouteRequest;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersFoodCardBalancePostRouteRequest;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersFoodCardHistoryJsonPostRouteRequest;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersIndexGetRouteRequest;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersListJsonPostRouteRequest;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersOrdersHistoryPostRouteRequest;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersRecordJsonPostRouteRequest;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersReportAttendancePostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the sca users.
 */
class ScaUsersRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('sca-users');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ScaUsersIndexGetRouteRequest::class);

        $this->call_request(ScaUsersDetailGetRouteRequest::class);

        $this->call_request(ScaUsersListJsonPostRouteRequest::class);

        $this->call_request(ScaUsersAttendanceByDayJsonPostRouteRequest::class);

        $this->call_request(ScaUsersFoodCardHistoryJsonPostRouteRequest::class);

        $this->call_request(ScaUsersRecordJsonPostRouteRequest::class);

        $this->call_request(ScaUsersOrdersHistoryPostRouteRequest::class);

        $this->call_request(ScaUsersFoodCardBalancePostRouteRequest::class);

        $this->call_request(ScaUsersReportAttendancePostRouteRequest::class);

        $this->call(ScaUsersExportRouteGroup::class);
    }
}
