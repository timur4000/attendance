<?php

namespace App\RoutesRequests\Admin\MainSpriteIcons;

use App\Admin\Controllers\MainSpriteIcons\MainSpriteIconsController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare put route of main sprite icons group.
 */
class MainSpriteIconsPutPatchRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ MainSpriteIconsController::class, 'patch' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('patch');
    }
}
