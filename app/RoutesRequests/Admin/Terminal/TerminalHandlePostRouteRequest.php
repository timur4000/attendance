<?php

namespace App\RoutesRequests\Admin\Terminal;

use App\Admin\Controllers\Terminal\TerminalController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare handle route of terminal group.
 */
class TerminalHandlePostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TerminalController::class, 'handle' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('handle');
    }
}
