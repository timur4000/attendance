<?php

namespace App\RoutesRequests\Admin\Configurations\Values;

use App\Admin\Controllers\Configurations\Values\ValuesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare detail route of configuration values group.
 */
class ValuesDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ValuesController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('id');

        $this->set_identifier('detail');
    }
}
