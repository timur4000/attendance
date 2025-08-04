<?php

namespace App\RouteGroups\Admin\Configurations\Groups;

use App\RoutesRequests\Admin\Configurations\Groups\GroupsDeleteGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Groups\GroupsDetailGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Groups\GroupsIndexGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Groups\GroupsPutGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Groups\GroupsPutPostRouteRequest;
use App\RoutesRequests\Admin\Configurations\Groups\GroupsRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the configuration groups.
 */
class ConfigurationGroupsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('groups');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(GroupsIndexGetRouteRequest::class);

        $this->call_request(GroupsRecordsJsonPostRouteRequest::class);

        $this->call_request(GroupsDetailGetRouteRequest::class);

        $this->call_request(GroupsPutGetRouteRequest::class);

        $this->call_request(GroupsPutPostRouteRequest::class);

        $this->call_request(GroupsDeleteGetRouteRequest::class);
    }
}
