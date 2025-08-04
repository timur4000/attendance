<?php

namespace App\Standards\Callables\Handlers\Orders;

use App\Admin\Controllers\SimpleOrdersList\SimpleOrdersListController;
use App\ApiModels\Food\Orders\OrderSummaryApiModel;
use App\ApiRequestSettings\Data\Food\Orders\OrderSelectApiRequestSettings;
use App\Handlers\Admin\Food\Orders\OrdersHandler;

/**
 * Implements callable for the map method for items adding.
 *
 * @see SimpleOrdersListController::records_json
 */
class OrdersItemsAddMapCallable
{
    /**
     * @var OrderSelectApiRequestSettings
     */
    private OrderSelectApiRequestSettings $settings;

    public function __construct(OrderSelectApiRequestSettings $settings)
    {
        $this->settings = clone $settings;

        $this->settings->summary_data = 0;
    }

    /**
     * @param OrderSummaryApiModel $record
     *
     * @param int $index
     *
     * @return OrderSummaryApiModel
     */
    public function __invoke(OrderSummaryApiModel $record, int $index): OrderSummaryApiModel
    {
        $this->settings->id_order = $record->id_order;

        $record->items = OrdersHandler::records($this->settings);

        return $record;
    }
}
