<?php

namespace App\RoutesRequests\Admin\AdminRoles;

use App\Admin\Controllers\AdminRoles\AdminRolesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare records json route of admin roles group.
 */
class AdminRolesRecordsJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ AdminRolesController::class, 'records_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('records-json');
    }
}
