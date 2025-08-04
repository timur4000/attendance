<?php

namespace App\RoutesRequests\Admin\Prices\Invoices;

use App\Admin\Controllers\Prices\Invoices\InvoicesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index invoices route of admin group.
 */
class InvoicesIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ InvoicesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
