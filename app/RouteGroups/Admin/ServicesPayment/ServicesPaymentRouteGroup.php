<?php

namespace App\RouteGroups\Admin\ServicesPayment;

use App\RouteGroups\Admin\ServicesPayment\Tuition\TuitionRouteGroup;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the services payment.
 */
class ServicesPaymentRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('services-payment');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call(TuitionRouteGroup::class);
    }
}
