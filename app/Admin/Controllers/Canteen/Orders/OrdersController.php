<?php

namespace App\Admin\Controllers\Canteen\Orders;

use App\Admin\Controllers\BaseController;
use App\ApiModels\Food\Orders\OrderItemApiModel;
use App\ApiRequestSettings\Data\Food\Orders\OrderCreateApiRequestSettings;
use App\Exports\Orders\OrdersHistoryExport;
use App\Handlers\Admin\Configurations\Values\ValuesHandler;
use App\Handlers\Admin\Food\Orders\OrdersHandler;
use App\Handlers\Admin\Prices\Food\FoodHandler;
use App\Managers\Date\DateManager;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Callables\Handlers\Orders\OrdersItemsPictureAddMapCallable;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Response\Classes\Response;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Implements actions of the orders.
 */
class OrdersController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        return view(admin_directory('admin.orders.index'));
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

        $payment_standard = null;

        $record = OrdersHandler::create($settings);

        if (!$record->is_success())
        {
            return Response::get_instance()->set_record($record)->set_message($record->message)->set_status(HttpCodesClassifier::CONFLICT)->json();
        }

        if (ValuesHandler::get_by_code('IS_ORDER_PAID_AFTER_CONFIRMATION')->value_integer ?? false)
        {
            $payment_standard = OrdersHandler::create_order_model(OrdersHandler::payment($record->id_object), true);
        }

        return Response::get_instance()->set_data($payment_standard)->set_record($record)->set_message($record->message)->json();
    }

    /**
     * Displaying index page.
     *
     * @return JsonResponse
     */
    public function items_json(): JsonResponse
    {
        $records = FoodHandler::records();

        $records->map(new OrdersItemsPictureAddMapCallable());

        return Response::get_instance()->set_data($records)->json();
    }

    /**
     * Implements download an excel file.
     *
     * @param Request $request
     *
     * @return BinaryFileResponse
     */
    public function order_history_excel(Request $request): BinaryFileResponse
    {
        return Excel::download(new OrdersHistoryExport($request), DateManager::datetime() . '_orders_history.xlsx');
    }
}
