<?php

namespace App\RoutesRequests\Admin\Prices\Invoices;

use App\Admin\Controllers\Prices\Invoices\InvoicesController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index invoices route of admin group.
 */
class InvoicesDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ InvoicesController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('record_id');

        $this->set_identifier(CommonTermClassifier::DETAIL->value);
    }
}
