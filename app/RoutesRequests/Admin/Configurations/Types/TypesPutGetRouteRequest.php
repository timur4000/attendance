<?php

namespace App\RoutesRequests\Admin\Configurations\Types;

use App\Admin\Controllers\Configurations\Types\TypesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of configuration types group.
 */
class TypesPutGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TypesController::class, 'form' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id?');

        $this->set_identifier('put');
    }
}
