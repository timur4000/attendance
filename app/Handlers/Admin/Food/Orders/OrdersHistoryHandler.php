<?php

namespace App\Handlers\Admin\Food\Orders;

use App\ApiModels\Food\Orders\OrderHistoryApiModel;
use App\ApiRequests\Data\Food\Orders\OrderHistorySelectApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderHistorySelectApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with orders history.
 */
class OrdersHistoryHandler extends Handler
{
    /**
     * Returns records.
     *
     * @param OrderHistorySelectApiRequestSettings|null $settings
     *
     * @return Collection
     */
    public static function records(? OrderHistorySelectApiRequestSettings $settings = null): Collection
    {
        $settings ??= new OrderHistorySelectApiRequestSettings();

        $request = new OrderHistorySelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, OrderHistoryApiModel::class);
    }

    /**
     * Returns total of records.
     *
     * @param OrderHistorySelectApiRequestSettings|null $settings
     *
     * @return int
     */
    public static function total(? OrderHistorySelectApiRequestSettings $settings = null): int
    {
        $settings ??= new OrderHistorySelectApiRequestSettings();

        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new OrderHistorySelectApiRequest($settings);

        $request->execute();

        return $request->get_response()->message;
    }
}
