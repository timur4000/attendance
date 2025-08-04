<?php

namespace App\RouteGroups\Admin\Localizations;

use App\RoutesRequests\Admin\Localizations\ChangeGetRouteRequest;
use App\Standards\Classifiers\Middlewares\MiddlewareClassifiers;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Declares group for admin localization group.
 */
class LocalizationRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('localizations');

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
