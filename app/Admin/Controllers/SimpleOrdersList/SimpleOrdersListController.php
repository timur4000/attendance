<?php

namespace App\Admin\Controllers\SimpleOrdersList;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Food\Orders\OrderSelectApiRequestSettings;
use App\Handlers\Admin\Food\Orders\OrdersHandler;
use App\Standards\ApiRequestSettings\Classifiers\Food\Orders\OrderPaymentStatesClassifier;
use App\Standards\Callables\Food\Orders\OrderFindDeletedIdOrdersToListCallable;
use App\Standards\Callables\Handlers\Orders\OrdersItemsAddMapCallable;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Response\Classes\Response;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use ReflectionException;

/**
 * Implements logic actions of the simple orders list.
 */
class SimpleOrdersListController extends BaseController
{
    /**
     * Displaying index page.
     * 
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb('', 'Simple Orders');

        return view(admin_directory('admin.simple-orders-list.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Returns json of records.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public function records_json(Request $request): JsonResponse
    {
        $settings = new OrderSelectApiRequestSettings();

        $settings->payment_completed = OrderPaymentStatesClassifier::PAID;

        $settings->update($request->json()->all());

        $records = OrdersHandler::records($settings);

        $records->map(new OrdersItemsAddMapCallable($settings));

        return Response::get_instance()->set_data($records)->set_total(OrdersHandler::total($settings))->json();
    }

    /**
     * Determines if the specified orders exist.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function exist(Request $request): JsonResponse
    {
        $records = OrdersHandler::find_deleted($request->json('identifiers'));

        $records = $records->map(new OrderFindDeletedIdOrdersToListCallable);

        return Response::get_instance()->set_data($records)->json();
    }

    /**
     * Removes order by the specified id.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function remove(Request $request): JsonResponse
    {
        $cancel = OrdersHandler::cancel($request->json('id_order'));

        if (!$cancel->is_success())
        {
            return Response::get_instance()->set_data($cancel)->set_message($cancel->message)->set_status(HttpCodesClassifier::CONFLICT)->json();
        }

        $record = OrdersHandler::delete($request->json('id_order'));

        if (!$record->is_success())
        {
            return Response::get_instance()->set_data($record)->set_message($record->message)->set_status(HttpCodesClassifier::CONFLICT)->json();
        }

        return Response::get_instance()->set_data($record)->set_message($record->message)->json();
    }
}
