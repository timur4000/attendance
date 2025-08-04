<?php

namespace App\RouteGroups\Admin\ScaUsers;

use App\RoutesRequests\Admin\ScaUsers\Export\ScaUsersExportExcelGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare export route group for the sca users group.
 */
class ScaUsersExportRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('export');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ScaUsersExportExcelGetRouteRequest::class);
    }
}
