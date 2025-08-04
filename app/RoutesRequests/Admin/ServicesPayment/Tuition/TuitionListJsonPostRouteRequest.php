<?php

namespace App\RoutesRequests\Admin\ServicesPayment\Tuition;

use App\Admin\Controllers\ServicesPayment\Tuition\TuitionController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare list json tuition route of admin group.
 */
class TuitionListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TuitionController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('list_json');
    }
}
