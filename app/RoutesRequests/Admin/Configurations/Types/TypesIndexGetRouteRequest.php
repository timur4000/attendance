<?php

namespace App\RoutesRequests\Admin\Configurations\Types;

use App\Admin\Controllers\Configurations\Types\TypesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of configuration types group.
 */
class TypesIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TypesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
