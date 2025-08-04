<?php

namespace App\Admin\Controllers\Canteen;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Canteen\Clients\CanteenClientsApiRequestSettings;
use App\ApiRequestSettings\Data\Food\Orders\OrderSelectApiRequestSettings;
use App\Handlers\Admin\Canteen\Clients\CanteenHandler;
use App\Handlers\Admin\Food\Orders\OrdersHandler;
use App\Managers\Date\DateManager;
use App\Standards\Classifiers\Date\DateFormatsClassifier;
use App\Standards\Response\Classes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use ReflectionException;

/**
 * Implements actions of the canteen.
 */
class CanteenController extends BaseController
{
    /**
     * Returns json of the clients.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public function clients_json(Request $request): JsonResponse
    {
        $settings = new CanteenClientsApiRequestSettings();

        $settings->update($request->json()->all());

        if (preg_match('/\d{4}, [a-z]*/i', $request->json('date_end')))
        {
            $settings->date_end = DateManager::datetime(DateFormatsClassifier::Y_m_d, $settings->date_end);

            $settings->date_start = date('Y-m-d', strtotime($settings->date_end . ' first day of'));
        }

        $records = CanteenHandler::clients($settings);

        $total = CanteenHandler::clients_total($settings);
        
        if (!$records->is_success() || !$total->is_success())
        {
            return Response::get_instance()->set_message($records->message . $total->message)->json();
        }

        return Response::get_instance()->set_data(CanteenHandler::create($records->package, true))->set_total($total->message)->json();
    }

    /**
     * Returns json of the orders.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public function orders_json(Request $request): JsonResponse
    {
        $settings = new OrderSelectApiRequestSettings();

        $settings->update($request->json()->all());

        if (preg_match('/\d{4}, [a-z]*/i', $request->json('date_end')))
        {
            $settings->date_end = DateManager::datetime(DateFormatsClassifier::Y_m_d, $settings->date_end);

            $settings->date_start = date('Y-m-d', strtotime($settings->date_end . ' first day of'));
        }

        $records = OrdersHandler::records($settings);

        $total = OrdersHandler::total($settings);

        return Response::get_instance()->set_data($records)->set_total($total)->json();
    }
}
