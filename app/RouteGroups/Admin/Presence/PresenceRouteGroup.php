<?php

namespace App\RouteGroups\Admin\Presence;

use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the presence.
 */
class PresenceRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('presence');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call(LatecomersRouteGroup::class);

        $this->call(ArrivedOnTimeRouteGroup::class);

        $this->call(AbsentRouteGroup::class);
    }
}
