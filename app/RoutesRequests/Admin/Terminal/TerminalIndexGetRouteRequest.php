<?php

namespace App\RoutesRequests\Admin\Terminal;

use App\Admin\Controllers\Terminal\TerminalController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of terminal group.
 */
class TerminalIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ TerminalController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
