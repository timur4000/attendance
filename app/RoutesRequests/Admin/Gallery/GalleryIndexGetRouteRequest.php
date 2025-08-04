<?php

namespace App\RoutesRequests\Admin\Gallery;

use App\Admin\Controllers\Gallery\GalleryController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare index route of the gallery group.
 */
class GalleryIndexGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ GalleryController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('index');
    }
}
