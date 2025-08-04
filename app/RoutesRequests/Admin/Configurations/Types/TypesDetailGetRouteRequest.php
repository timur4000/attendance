<?php

namespace App\RoutesRequests\Admin\Configurations\Types;

use App\Admin\Controllers\Configurations\Types\TypesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare detail route of configuration types group.
 */
class TypesDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TypesController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('detail');
    }
}
