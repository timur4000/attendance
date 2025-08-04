<?php

namespace App\RouteGroups\Admin\FoodCard\Export;

use App\RoutesRequests\Admin\FoodCard\Export\FoodCardHistoryExportExcelGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare export route group for the food card group.
 */
class FoodCardExportRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('export');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(FoodCardHistoryExportExcelGetRouteRequest::class);
    }
}
