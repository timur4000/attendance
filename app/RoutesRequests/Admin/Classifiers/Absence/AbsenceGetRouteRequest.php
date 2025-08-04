<?php

namespace App\RoutesRequests\Admin\Classifiers\Absence;

use App\Admin\Controllers\Classifiers\AbsencesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare absences route of admin group.
 */
class AbsenceGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AbsencesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('absences.index');
    }
}
