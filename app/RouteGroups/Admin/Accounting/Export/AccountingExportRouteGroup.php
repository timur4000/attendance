<?php

namespace App\RouteGroups\Admin\Accounting\Export;

use App\RoutesRequests\Admin\Accounting\Export\AccountingExportExcelGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare export route group for the accounting group.
 */
class AccountingExportRouteGroup extends RouteGroup
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
        $this->call_request(AccountingExportExcelGetRouteRequest::class);
    }
}
