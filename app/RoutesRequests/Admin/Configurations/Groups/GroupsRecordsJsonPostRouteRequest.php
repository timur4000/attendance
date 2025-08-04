<?php

namespace App\RoutesRequests\Admin\Configurations\Groups;

use App\Admin\Controllers\Configurations\Groups\GroupsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare records json route of configuration groups group.
 */
class GroupsRecordsJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ GroupsController::class, 'records_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('records-json');
    }
}
