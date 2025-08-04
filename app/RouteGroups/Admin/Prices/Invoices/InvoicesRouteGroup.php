<?php

namespace App\RouteGroups\Admin\Prices\Invoices;

use App\RoutesRequests\Admin\Prices\Invoices\InvoicesIndexGetRouteRequest;
use App\RoutesRequests\Admin\Prices\Invoices\InvoicesListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Prices\Invoices\InvoicesUpdatePostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the invoices.
 */
class InvoicesRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('invoices');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(InvoicesIndexGetRouteRequest::class);

        $this->call_request(InvoicesUpdatePostRouteRequest::class);

//        $this->call_request(InvoicesDetailGetRouteRequest::class);

        $this->call_request(InvoicesListJsonPostRouteRequest::class);
    }
}
