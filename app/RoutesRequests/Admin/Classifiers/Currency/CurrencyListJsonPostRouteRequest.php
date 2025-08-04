<?php

namespace App\RoutesRequests\Admin\Classifiers\Currency;

use App\Admin\Controllers\Classifiers\CurrencyController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units list json route of admin group.
 */
class CurrencyListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CurrencyController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('currencies.list.json');
    }
}
