<?php

namespace App\Admin\Controllers\Canteen\OrdersList;

use App\Admin\Controllers\BaseController;
use App\ApiModels\Food\Orders\OrderItemApiModel;
use App\ApiRequestSettings\Data\Food\Orders\OrderCreateApiRequestSettings;
use App\ApiRequestSettings\Data\Food\Orders\OrderSelectApiRequestSettings;
use App\Handlers\Admin\Food\Orders\OrdersHandler;
use App\RoutesRequests\Admin\OrdersList\OrdersListIndexGetRouteRequest;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiRequests\Classifiers\ApiRequestNumberClassifier;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Response\Classes\Response;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements actions of the orders list.
 */
class OrdersListController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(OrdersListIndexGetRouteRequest::class), 'Orders List');

        return view(admin_directory('admin.orders-list.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Deletes record.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function delete(Request $request): JsonResponse
    {
        $response = OrdersHandler::delete($request->json('id_order'));

        return Response::get_instance()->set_data($response)->set_message('')->json();
    }

    /**
     * Payment record.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function payment(Request $request): JsonResponse
    {
        $response = OrdersHandler::payment($request->json('id_order'));

        $record = OrdersHandler::create_order_model($response, true);

        return Response::get_instance()->set_data($response)->set_record($record)->json();
    }

    /**
     * Cancels payment.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function cancel(Request $request): JsonResponse
    {
        $response = OrdersHandler::cancel($request->json('id_order'));

        $record = OrdersHandler::create_order_model($response, true);

        return Response::get_instance()->set_data($response)->set_record($record)->json();
    }

    /**
     * Removes the given order and create new by the given data.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function change(Request $request): JsonResponse
    {
        $settings = new OrderCreateApiRequestSettings();

        $settings->id_user = $request->json('id_user');

        $settings->data = ApiModel::create($request->json('data'), OrderItemApiModel::class);

        if (!$settings->is_can_pay())
        {
            return Response::get_instance()->set_message('User don\'t have enough funds on your card!')->set_status(HttpCodesClassifier::BAD_REQUEST)->json();
        }

        $response = OrdersHandler::delete($request->json('id_order'));

        if ($response->number !== ApiRequestNumberClassifier::SUCCESS->value)
        {
            return Response::get_instance()->set_data($response)->json();
        }

        $response = OrdersHandler::create($settings);

        return Response::get_instance()->set_data($response)->set_message('Order has been changed!')->json();
    }

    /**
     * Returns json of records.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function records_json(Request $request): JsonResponse
    {
        $settings = new OrderSelectApiRequestSettings();

        $settings->update($request->json()->all());

        if ($settings->last_id_order !== 0)
        {
            $settings->id_order = 0;
        }

        $records = OrdersHandler::records($settings);

        return Response::get_instance()->set_data($records)->set_total(OrdersHandler::total($settings))->json();
    }
}
