<?php

namespace App\RoutesRequests\Admin\MainSpriteIcons;

use App\Admin\Controllers\MainSpriteIcons\MainSpriteIconsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of main sprite icons group.
 */
class MainSpriteIconsIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ MainSpriteIconsController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
