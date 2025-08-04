<?php

namespace App\RoutesRequests\Admin\Classifiers\Gender;

use App\Admin\Controllers\Classifiers\GendersController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units route of admin group.
 */
class GenderGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ GendersController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('genders.index');
    }
}
