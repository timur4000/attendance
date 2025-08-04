<?php

namespace App\RoutesRequests\Admin\Prices\Invoices;

use App\Admin\Controllers\Prices\Invoices\InvoicesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare update invoices route of admin group.
 */
class InvoicesUpdatePostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ InvoicesController::class, 'update' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('update');
    }
}
