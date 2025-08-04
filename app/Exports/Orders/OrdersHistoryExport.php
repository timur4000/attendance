<?php

namespace App\Exports\Orders;

use App\ApiRequestSettings\Data\Food\Orders\OrderHistorySelectApiRequestSettings;
use App\Handlers\Admin\Food\Orders\OrdersHistoryHandler;
use App\Standards\Exports\Abstracts\TablesCollectionExport;
use Illuminate\Support\Collection;
use ReflectionException;

/**
 * Implements exports for the orders history records.
 */
class OrdersHistoryExport extends TablesCollectionExport
{
    /**
     * @return Collection
     *
     * @throws ReflectionException
     */
    public function set_collection(): Collection
    {
        $settings = new OrderHistorySelectApiRequestSettings();

        $settings->update(request()->all());

        return OrdersHistoryHandler::records($settings);
    }
}
