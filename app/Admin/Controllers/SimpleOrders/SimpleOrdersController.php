<?php

namespace App\Admin\Controllers\SimpleOrders;

use App\Admin\Controllers\BaseController;
use App\ApiModels\Food\Orders\OrderApiModel;
use App\ApiModels\Food\Orders\OrderItemApiModel;
use App\ApiModels\Food\Orders\OrderSummaryApiModel;
use App\ApiModels\Parameters\ParameterApiModel;
use App\ApiRequestSettings\Data\Food\Orders\OrderCreateApiRequestSettings;
use App\Handlers\Admin\Food\FoodCard\FoodCardHandler;
use App\Handlers\Admin\Food\Orders\OrdersHandler;
use App\Handlers\Admin\Parameters\ParametersHandler;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiRequestSettings\Classifiers\Parameters\ParametersIdsClassifier;
use App\Standards\Response\Classes\Response;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements logic actions of the simple orders.
 */
class SimpleOrdersController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        return view(admin_directory('admin.simple-orders.index'));
    }

    /**
     * Confirmation of order.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function confirmation(Request $request): JsonResponse
    {
        $settings = new OrderCreateApiRequestSettings();

        $settings->id_user = $request->json('id_user');

        $settings->data = ApiModel::create($request->json('items'), OrderItemApiModel::class);

        if (!$request->json('on_credit') && self::is_deficit($settings))
        {
            return Response::get_instance()->set_data([ 'is_deficit' => true, 'balance_minimum' => self::get_food_card_balance_minimum()->value_integer ])->set_record(FoodCardHandler::get($settings->id_user))->set_message('')->json();
        }

        $record = $this->confirmation_processing($settings);

        return Response::get_instance()->set_data([ 'success' => true ])->set_record($record)->json();
    }

    /**
     * Implements process of the confirmation action.
     *
     * @param OrderCreateApiRequestSettings $settings
     *
     * @return OrderApiModel|OrderSummaryApiModel
     */
    public function confirmation_processing(OrderCreateApiRequestSettings $settings): OrderSummaryApiModel | OrderApiModel
    {
         $standard = OrdersHandler::create($settings);

         return OrdersHandler::create_order_model(OrdersHandler::payment($standard->id_object), true);
    }

    /**
     * Checks if the given user does not have enough money.
     *
     * @param OrderCreateApiRequestSettings $settings
     *
     * @return bool
     */
    public static function is_deficit(OrderCreateApiRequestSettings $settings): bool
    {
        return FoodCardHandler::get($settings->id_user)->money_amount < self::get_price($settings);
    }

    /**
     * Returns parameter of the food card balance minimum.
     *
     * @return ParameterApiModel
     */
    public static function get_food_card_balance_minimum(): ParameterApiModel
    {
        return ParametersHandler::records_from_response(ParametersHandler::response(ParametersIdsClassifier::FOOD_CARD_BALANCE_MINIMUM), true);
    }

    /**
     * Calculates and returns total price.
     *
     * @param OrderCreateApiRequestSettings $settings
     *
     * @return int
     */
    public static function get_price(OrderCreateApiRequestSettings $settings): int
    {
        $price = 0;

        foreach ($settings->data as $datum)
        {
            $price += $datum->price;
        }

        return $price;
    }
}
