<?php

namespace App\RouteGroups\Admin\Canteen;

use App\RoutesRequests\Admin\Canteen\Clients\CanteenClientsJsonPostRouteRequest;
use App\RoutesRequests\Admin\Canteen\Orders\CanteenOrdersJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the canteen.
 */
class CanteenRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('canteen');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(CanteenClientsJsonPostRouteRequest::class);

        $this->call_request(CanteenOrdersJsonPostRouteRequest::class);
    }
}
