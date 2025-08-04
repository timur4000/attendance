<?php

namespace App\RoutesRequests\Admin\Prices\Invoices;

use App\Admin\Controllers\Prices\Invoices\InvoicesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare list json invoices route of admin group.
 */
class InvoicesListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ InvoicesController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('list_json');
    }
}
