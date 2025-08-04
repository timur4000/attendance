<?php

namespace App\RouteGroups\Admin\MainSpriteIcons;

use App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsDeleteGetRouteRequest;
use App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsIndexGetRouteRequest;
use App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsPutGetRouteRequest;
use App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsPutPatchRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the main sprite icons.
 */
class MainSpriteIconsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('main-sprite-icons');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(MainSpriteIconsIndexGetRouteRequest::class);

        $this->call_request(MainSpriteIconsPutGetRouteRequest::class);

        $this->call_request(MainSpriteIconsPutPatchRouteRequest::class);

        $this->call_request(MainSpriteIconsDeleteGetRouteRequest::class);
    }
}
