<?php

namespace App\RoutesRequests\Admin\Accounting;

use App\Admin\Controllers\Accounting\AccountingController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare totals route of accounting group.
 */
class AccountingTotalsPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AccountingController::class, 'totals' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('totals');
    }
}
