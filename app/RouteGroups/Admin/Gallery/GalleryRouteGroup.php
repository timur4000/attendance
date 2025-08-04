<?php

namespace App\RouteGroups\Admin\Gallery;

use App\RoutesRequests\Admin\Gallery\GalleryIndexGetRouteRequest;
use App\RoutesRequests\Admin\Gallery\GalleryRegistrationRecordsPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the gallery group.
 */
class GalleryRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('gallery');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(GalleryIndexGetRouteRequest::class);

        $this->call_request(GalleryRegistrationRecordsPostRouteRequest::class);
    }
}
