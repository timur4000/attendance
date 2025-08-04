<?php

namespace App\RoutesRequests\Admin\Absences;

use App\Admin\Controllers\AbsencesController\AbsencesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare delete post route of absences group.
 */
class AbsencesDeletePostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AbsencesController::class, 'delete' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::delete);

        $this->set_identifier('delete');
    }
}
