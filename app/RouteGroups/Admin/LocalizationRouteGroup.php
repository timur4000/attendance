<?php

namespace App\RouteGroups\Admin;

use App\RoutesRequests\Admin\Localization\ChangeGetRouteRequest;
use App\Standards\Abstracts\RouteGroup\RouteGroup;
use App\Standards\Classifiers\Middlewares\MiddlewareClassifiers;

/**
 * Declares group for admin localization group.
 */
class LocalizationRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('localization');

        $this->add_ignored_middleware(MiddlewareClassifiers::admin_authorization);
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(ChangeGetRouteRequest::class);
    }
}
