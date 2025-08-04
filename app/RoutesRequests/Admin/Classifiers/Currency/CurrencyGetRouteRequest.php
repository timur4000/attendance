<?php

namespace App\RoutesRequests\Admin\Classifiers\Currency;

use App\Admin\Controllers\Classifiers\CurrencyController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units route of admin group.
 */
class CurrencyGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CurrencyController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('currencies.index');
    }
}
