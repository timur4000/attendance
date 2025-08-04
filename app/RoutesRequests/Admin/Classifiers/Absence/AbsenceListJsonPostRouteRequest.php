<?php

namespace App\RoutesRequests\Admin\Classifiers\Absence;

use App\Admin\Controllers\Classifiers\AbsencesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare absences list json route of admin group.
 */
class AbsenceListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AbsencesController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('absences.list.json');
    }
}
