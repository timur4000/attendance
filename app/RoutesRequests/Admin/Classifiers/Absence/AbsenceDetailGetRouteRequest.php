<?php

namespace App\RoutesRequests\Admin\Classifiers\Absence;

use App\Admin\Controllers\Classifiers\AbsencesController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare absences detail route of admin group.
 */
class AbsenceDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AbsencesController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable(CommonTermClassifier::DETAIL->value);

        $this->set_identifier('absences.detail');
    }
}
