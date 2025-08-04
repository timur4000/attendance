<?php

namespace App\RouteGroups\Admin\ServicesPayment\Tuition;

use App\RoutesRequests\Admin\ServicesPayment\Tuition\TuitionDetailGetRouteRequest;
use App\RoutesRequests\Admin\ServicesPayment\Tuition\TuitionIndexGetRouteRequest;
use App\RoutesRequests\Admin\ServicesPayment\Tuition\TuitionListJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the tuition.
 */
class TuitionRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('tuition');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(TuitionIndexGetRouteRequest::class);

        $this->call_request(TuitionDetailGetRouteRequest::class);

        $this->call_request(TuitionListJsonPostRouteRequest::class);
    }
}
