<?php

namespace App\RoutesRequests\Admin\Absences;

use App\Admin\Controllers\AbsencesController\AbsencesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare patch post route of absences group.
 */
class AbsencesPatchPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AbsencesController::class, 'patch' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('patch');
    }
}
