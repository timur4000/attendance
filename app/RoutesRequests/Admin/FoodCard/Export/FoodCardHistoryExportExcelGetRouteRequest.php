<?php

namespace App\RoutesRequests\Admin\FoodCard\Export;

use App\Admin\Controllers\FoodCard\FoodCardController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare history excel route of food card group.
 */
class FoodCardHistoryExportExcelGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ FoodCardController::class, 'history_excel' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('history-excel');
    }
}
