<?php

namespace App\RoutesRequests\Admin\ClassifierTypes;

use App\Admin\Controllers\ClassifierTypes\ClassifierTypesController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare detail classifier types route of admin group.
 */
class ClassifierTypesDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ClassifierTypesController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier(CommonTermClassifier::DETAIL->value);

        $this->add_variable(CommonTermClassifier::DETAIL->value);
    }
}
