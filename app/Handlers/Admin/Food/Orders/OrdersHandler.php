<?php

namespace App\Handlers\Admin\Food\Orders;

use App\ApiModels\Food\Orders\OrderApiModel;
use App\ApiModels\Food\Orders\OrderFindDeletedApiModel;
use App\ApiModels\Food\Orders\OrderSummaryApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Food\Orders\OrderCreateApiRequest;
use App\ApiRequests\Data\Food\Orders\OrderDeleteApiRequest;
use App\ApiRequests\Data\Food\Orders\OrderFindDeletedApiRequest;
use App\ApiRequests\Data\Food\Orders\OrderPaymentCancelApiRequest;
use App\ApiRequests\Data\Food\Orders\OrderPayTheBillApiRequest;
use App\ApiRequests\Data\Food\Orders\OrderSelectApiRequest;
use App\ApiRequestSettings\Data\Food\Orders\OrderCreateApiRequestSettings;
use App\ApiRequestSettings\Data\Food\Orders\OrderDeleteApiRequestSettings;
use App\ApiRequestSettings\Data\Food\Orders\OrderFindDeletedApiRequestSettings;
use App\ApiRequestSettings\Data\Food\Orders\OrderPaymentCancelApiRequestSettings;
use App\ApiRequestSettings\Data\Food\Orders\OrderPayTheBillApiRequestSettings;
use App\ApiRequestSettings\Data\Food\Orders\OrderSelectApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with orders.
 */
class OrdersHandler extends Handler
{
    /**
     * Returns records.
     *
     * @param OrderSelectApiRequestSettings|null $settings
     *
     * @return Collection<OrderApiModel|OrderSummaryApiModel>
     */
    public static function records(? OrderSelectApiRequestSettings $settings = null): Collection
    {
        $settings ??= new OrderSelectApiRequestSettings();

        $request = new OrderSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, $settings->get_model($settings->summary_data));
    }

    /**
     * Returns total of records.
     *
     * @param OrderSelectApiRequestSettings|null $settings
     *
     * @return int
     */
    public static function total(? OrderSelectApiRequestSettings $settings = null): int
    {
        $settings ??= new OrderSelectApiRequestSettings();

        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new OrderSelectApiRequest($settings);

        $request->execute();

        return $request->get_response()->message;
    }

    /**
     * Creates record.
     *
     * @param OrderCreateApiRequestSettings $settings
     *
     * @return StandardResponseApiModel
     */
    public static function create(OrderCreateApiRequestSettings $settings): StandardResponseApiModel
    {
        $request = new OrderCreateApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Deletes record.
     *
     * @param int $id_order
     *
     * @param OrderDeleteApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function delete(int $id_order, ? OrderDeleteApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new OrderDeleteApiRequestSettings();

        $settings->id_order = $id_order;

        $request = new OrderDeleteApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Finds deleted records.
     *
     * @param array $id_orders
     *
     * @param OrderFindDeletedApiRequestSettings|null $settings
     *
     * @return Collection
     */
    public static function find_deleted(array $id_orders, ? OrderFindDeletedApiRequestSettings $settings = null): Collection
    {
        $settings ??= new OrderFindDeletedApiRequestSettings();

        $settings->list_of_orders = implode(CharsClassifiers::STRING_SEPARATOR, $id_orders);

        $request = new OrderFindDeletedApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, OrderFindDeletedApiModel::class);
    }

    /**
     * Payment record.
     *
     * @param int $id_order
     *
     * @param OrderPayTheBillApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function payment(int $id_order, ? OrderPayTheBillApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new OrderPayTheBillApiRequestSettings();

        $settings->id_order = $id_order;

        $request = new OrderPayTheBillApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Cancels payment.
     *
     * @param int $id_order
     *
     * @param OrderPaymentCancelApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function cancel(int $id_order, ? OrderPaymentCancelApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new OrderPaymentCancelApiRequestSettings();

        $settings->id_order = $id_order;

        $request = new OrderPaymentCancelApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Creates and returns model instance by the given standard response.
     *
     * @param StandardResponseApiModel $standard
     *
     * @param bool $is_summary
     *
     * @return OrderApiModel|OrderSummaryApiModel
     */
    public static function create_order_model(StandardResponseApiModel $standard, bool $is_summary = false): OrderApiModel | OrderSummaryApiModel
    {
        return ApiModel::create_one($standard->first_package(), OrderSelectApiRequestSettings::get_model($is_summary));
    }
}
