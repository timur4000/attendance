<?php

namespace App\RoutesRequests\Admin\Accounting\Export;

use App\Admin\Controllers\Accounting\AccountingController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare excel route of accounting group.
 */
class AccountingExportExcelGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AccountingController::class, 'excel' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('excel');
    }
}
