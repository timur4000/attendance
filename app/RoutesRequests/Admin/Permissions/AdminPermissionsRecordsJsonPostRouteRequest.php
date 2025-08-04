<?php

namespace App\RoutesRequests\Admin\Permissions;

use App\Admin\Controllers\Permissions\PermissionsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare records json route of admin permissions group.
 */
class AdminPermissionsRecordsJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ PermissionsController::class, 'records_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('records-json');
    }
}
