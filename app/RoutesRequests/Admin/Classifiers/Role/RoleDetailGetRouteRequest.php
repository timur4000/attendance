<?php

namespace App\RoutesRequests\Admin\Classifiers\Role;

use App\Admin\Controllers\Classifiers\RolesController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare roles route of admin group.
 */
class RoleDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ RolesController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable(CommonTermClassifier::DETAIL->value);

        $this->set_identifier('roles.detail');
    }
}
