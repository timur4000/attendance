<?php

namespace App\RouteGroups\Admin\Prices;

use App\RouteGroups\Admin\Prices\Food\FoodRouteGroup;
use App\RouteGroups\Admin\Prices\Invoices\InvoicesRouteGroup;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the prices.
 */
class PricesRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('prices');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call(InvoicesRouteGroup::class);

        $this->call(FoodRouteGroup::class);
    }
}
