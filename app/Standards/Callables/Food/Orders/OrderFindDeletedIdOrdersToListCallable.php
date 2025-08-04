<?php

namespace App\Standards\Callables\Food\Orders;

use App\ApiModels\Food\Orders\OrderFindDeletedApiModel;
use App\Standards\Callables\Interfaces\ICallable;

/**
 * Implements callable method for converting id_order of OrderFindDeletedApiModel to list.
 */
class OrderFindDeletedIdOrdersToListCallable implements ICallable
{
    /**
     * @param OrderFindDeletedApiModel $model
     *
     * @param int $key
     *
     * @return int
     */
    public function __invoke(OrderFindDeletedApiModel $model, int $key): int
    {
        return $model->id_order;
    }
}
