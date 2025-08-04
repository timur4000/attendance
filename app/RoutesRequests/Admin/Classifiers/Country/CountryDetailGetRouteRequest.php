<?php

namespace App\RoutesRequests\Admin\Classifiers\Country;

use App\Admin\Controllers\Classifiers\CountriesController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare countries detail route of admin group.
 */
class CountryDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ CountriesController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable(CommonTermClassifier::DETAIL->value);

        $this->set_identifier('countries.detail');
    }
}
