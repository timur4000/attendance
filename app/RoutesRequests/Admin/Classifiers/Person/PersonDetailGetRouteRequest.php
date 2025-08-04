<?php

namespace App\RoutesRequests\Admin\Classifiers\Person;

use App\Admin\Controllers\Classifiers\PersonsController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare person categories detail route of admin group.
 */
class PersonDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PersonsController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable(CommonTermClassifier::DETAIL->value);

        $this->set_identifier('person-categories.detail');
    }
}
