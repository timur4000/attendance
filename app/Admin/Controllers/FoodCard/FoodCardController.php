<?php

namespace App\Admin\Controllers\FoodCard;

use App\Admin\Controllers\BaseController;
use App\Exports\FoodCard\FoodCardHistoryExport;
use App\Handlers\Admin\Food\FoodCard\FoodCardHandler;
use App\Managers\Date\DateManager;
use App\RoutesRequests\Admin\FoodCard\FoodCardPatchPostRouteRequest;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Classifiers\Http\HttpMethodsClassifiers;
use App\Standards\Forms\Classes\Form;
use App\Standards\Response\Classes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Implements logic action of the food card group.
 */
class FoodCardController extends BaseController
{
    /**
     * Returns form.
     *
     * @param int $id_user
     *
     * @return Form
     */
    public static function get_form(int $id_user): Form
    {
        $form = (new Form())
            ->set_id('food-card-add')
            ->action_by_route_request(FoodCardPatchPostRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST);

        $form
            ->number('money_added', 'Count')
            ->set_id('money-to-add')
            ->set_min(0)
            ->set_rules('required|numeric|min:1')
            ->set_readonly(false);

        $form
            ->hidden('id_user', $id_user)
            ->set_rules('required|numeric');

        $form->initialization();

        return $form;
    }

    /**
     * Creates record.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function patch(Request $request): JsonResponse
    {
        $validator = validator($request->all(), self::get_form($request->post('id_user'))->create_rules());

        if ($validator->fails())
        {
            return Response::get_instance()->set_errors($validator->errors())->json();
        }

        $response = FoodCardHandler::create($request->post('id_user'), $request->post('money_added'));

        $record = FoodCardHandler::create_model($response);

        return Response::get_instance()->set_data($response)->set_record($record)->json();
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
        $validator = validator($request->json()->all(), self::get_form($request->json('id_user'))->create_rules());

        if ($validator->fails())
        {
            return response()->json([ 'errors' => $validator->errors() ]);
        }

        $response = FoodCardHandler::last_remove($request->json('id_user'), $request->json('money_added'));

        $record = FoodCardHandler::create_model($response);

        return Response::get_instance()->set_data($response)->set_record($record)->json();
    }

    /**
     * Withdraws money.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function withdraw(Request $request): JsonResponse
    {
        $response = FoodCardHandler::withdraw($request->json('id_user'));

        if (!$response->is_success())
        {
            return Response::get_instance()->set_data($response->package)->set_message($response->message)->set_status(HttpCodesClassifier::CONFLICT)->json();
        }

        $record = FoodCardHandler::create_model($response);

        return Response::get_instance()->set_data($response)->set_record($record)->set_message($response->message)->json();
    }

    /**
     * Cancels withdraw money.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function cancel_withdraw(Request $request): JsonResponse
    {
        $response = FoodCardHandler::cancel_withdraw($request->json('id_user'));

        if (!$response->is_success())
        {
            return Response::get_instance()->set_data($response->package)->set_message($response->message)->set_status(HttpCodesClassifier::CONFLICT)->json();
        }

        $record = FoodCardHandler::create_model($response);

        return Response::get_instance()->set_data($response)->set_record($record)->set_message($response->message)->json();
    }

    /**
     * Implements download an Excel file with food card history records.
     *
     * @param Request $request
     *
     * @return BinaryFileResponse
     */
    public function history_excel(Request $request): BinaryFileResponse
    {
        return Excel::download(new FoodCardHistoryExport($request), DateManager::datetime() . '_food_card_history.xlsx');
    }
}
