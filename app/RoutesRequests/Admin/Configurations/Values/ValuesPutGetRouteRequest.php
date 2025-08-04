<?php

namespace App\RoutesRequests\Admin\Configurations\Values;

use App\Admin\Controllers\Configurations\Values\ValuesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of configuration values group.
 */
class ValuesPutGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ValuesController::class, 'form' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id?');

        $this->set_identifier('put');
    }
}
