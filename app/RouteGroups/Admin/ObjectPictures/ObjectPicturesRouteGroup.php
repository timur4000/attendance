<?php

namespace App\RouteGroups\Admin\ObjectPictures;

use App\RoutesRequests\Admin\ObjectPictures\ObjectPicturesPicturePostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the object pictures.
 */
class ObjectPicturesRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('object-pictures');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ObjectPicturesPicturePostRouteRequest::class);
    }
}
