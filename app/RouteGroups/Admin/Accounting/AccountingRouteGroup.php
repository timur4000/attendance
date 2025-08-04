<?php

namespace App\RouteGroups\Admin\Accounting;

use App\RouteGroups\Admin\Accounting\Export\AccountingExportRouteGroup;
use App\RoutesRequests\Admin\Accounting\AccountingIndexGetRouteRequest;
use App\RoutesRequests\Admin\Accounting\AccountingRecordsJsonPostRouteRequest;
use App\RoutesRequests\Admin\Accounting\AccountingTotalsPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the accounting.
 */
class AccountingRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('accounting');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(AccountingIndexGetRouteRequest::class);

        $this->call_request(AccountingRecordsJsonPostRouteRequest::class);

        $this->call_request(AccountingTotalsPostRouteRequest::class);

        $this->call(AccountingExportRouteGroup::class);
    }
}
