<?php

namespace App\RoutesRequests\Admin\Classifiers\Country;

use App\Admin\Controllers\Classifiers\CountriesController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare countries route of admin group.
 */
class CountryGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CountriesController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('countries.index');
    }
}
