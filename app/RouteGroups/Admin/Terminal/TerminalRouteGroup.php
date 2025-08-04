<?php

namespace App\RouteGroups\Admin\Terminal;

use App\RoutesRequests\Admin\Terminal\TerminalHandlePostRouteRequest;
use App\RoutesRequests\Admin\Terminal\TerminalIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the terminal.
 */
class TerminalRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('terminal');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(TerminalIndexGetRouteRequest::class);

        $this->call_request(TerminalHandlePostRouteRequest::class);
    }
}
