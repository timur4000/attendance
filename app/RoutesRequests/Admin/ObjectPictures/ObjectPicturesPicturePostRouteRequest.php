<?php

namespace App\RoutesRequests\Admin\ObjectPictures;

use App\Admin\Controllers\ObjectPictures\ObjectPicturesController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare picture route of object pictures group.
 */
class ObjectPicturesPicturePostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ ObjectPicturesController::class, 'picture_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('picture');
    }
}
