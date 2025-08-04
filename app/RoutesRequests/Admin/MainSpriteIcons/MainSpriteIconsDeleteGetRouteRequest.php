<?php

namespace App\RoutesRequests\Admin\MainSpriteIcons;

use App\Admin\Controllers\MainSpriteIcons\MainSpriteIconsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare delete route of main sprite icons group.
 */
class MainSpriteIconsDeleteGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ MainSpriteIconsController::class, 'delete' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('uuid');

        $this->set_identifier('delete');
    }
}
