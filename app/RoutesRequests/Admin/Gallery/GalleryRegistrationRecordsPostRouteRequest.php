<?php

namespace App\RoutesRequests\Admin\Gallery;

use App\Admin\Controllers\Gallery\GalleryController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare registration records route of the gallery group.
 */
class GalleryRegistrationRecordsPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ GalleryController::class, 'registration_records' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('registration-records');
    }
}
