<?php

namespace App\RouteGroups\Admin\Users\Export;

use App\RoutesRequests\Admin\Users\Export\UsersArrivalsDeparturesExportExcelGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare export route group for the users group.
 */
class UsersArrivalsDeparturesExportRouteGroup extends RouteGroup
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
        $this->call_request(UsersArrivalsDeparturesExportExcelGetRouteRequest::class);
    }
}
