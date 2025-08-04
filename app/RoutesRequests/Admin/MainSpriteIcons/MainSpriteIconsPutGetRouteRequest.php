<?php

namespace App\RoutesRequests\Admin\MainSpriteIcons;

use App\Admin\Controllers\MainSpriteIcons\MainSpriteIconsController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of main sprite icons group.
 */
class MainSpriteIconsPutGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ MainSpriteIconsController::class, 'form' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable('uuid?');

        $this->set_identifier('put');
    }
}
