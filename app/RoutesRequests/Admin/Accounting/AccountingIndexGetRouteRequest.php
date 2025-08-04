<?php

namespace App\RoutesRequests\Admin\Accounting;

use App\Admin\Controllers\Accounting\AccountingController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of accounting group.
 */
class AccountingIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AccountingController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
