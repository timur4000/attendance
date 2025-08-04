<?php

namespace App\Admin\Controllers\ScaUsers;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendanceDataOneDayByHoursApiRequestSettings;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardHistorySelectApiRequestSettings;
use App\ApiRequestSettings\Data\Food\Orders\OrderHistorySelectApiRequestSettings;
use App\ApiRequestSettings\Data\ScaUsers\ScaUsersApiRequestSettings;
use App\Exports\ScaUsers\ScaUsersExport;
use App\Handlers\Admin\Dashboard\Attendance\AttendanceHandler;
use App\Handlers\Admin\Food\FoodCard\FoodCardHandler;
use App\Handlers\Admin\Food\Orders\OrdersHistoryHandler;
use App\Handlers\Admin\ScaReportAttendanceOneUser\ScaReportAttendanceOneUserHandler;
use App\Handlers\Admin\ScaUsers\ScaUsersHandler;
use App\Managers\Date\DateManager;
use App\RoutesRequests\Admin\ScaUsers\ScaUsersIndexGetRouteRequest;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Response\Classes\Response;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use ReflectionException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Implements Implements logic actions of the sca users.
 */
class ScaUsersController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(ScaUsersIndexGetRouteRequest::class), 'Users');

        return view(admin_directory('admin.sca-users.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Displaying detail page.
     *
     * @param int $id
     *
     * @return View
     */
    public function detail(int $id): View
    {
        $record = ScaUsersHandler::record($id);

        if ($record->is_empty())
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        $this->add_breadcrumb(RouteGroup::get_route(ScaUsersIndexGetRouteRequest::class), 'Users');

        $this->add_breadcrumb('', $record->get_person_name());

        return view(admin_directory('admin.sca-users.detail'))
            ->with(compact('record'))
            ->with($this->get_breadcrumbs_to_with());
    }
    /**
     * Returns attendance by day in json format.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function attendance_by_day_json(Request $request): JsonResponse
    {
        $settings = new AttendanceDataOneDayByHoursApiRequestSettings();

        $settings->update($request->json()->all());

        $records = AttendanceHandler::attendance_users_by_day($settings);

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }

    /**
     * Returns food card history in json format.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function food_card_history(Request $request): JsonResponse
    {
        $settings = new FoodCardHistorySelectApiRequestSettings();

        $settings->update($request->json()->all());

        $records = FoodCardHandler::history($request->json('id_user'), $settings);

        return response()->json(
            [
                'data' => $records,
                'total' => FoodCardHandler::history_total($request->json('id_user'), $settings),
                'json' => $settings->to_array(),
            ]
        );
    }

    /**
     * Returns response of the food card balance.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function food_card_balance(Request $request): JsonResponse
    {
        return Response::get_instance()->set_record(FoodCardHandler::get($request->json('id_user')))->json();
    }

    /**
     * Returns response of the report attendance.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function report_attendance(Request $request): JsonResponse
    {
        return Response::get_instance()->set_record(ScaReportAttendanceOneUserHandler::record($request->json('id_user')))->json();
    }

    /**
     * Returns orders history in json format.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public function orders_history(Request $request): JsonResponse
    {
        $settings = new OrderHistorySelectApiRequestSettings();

        $settings->update($request->json()->all());

        $records = OrdersHistoryHandler::records($settings);

        return Response::get_instance()->set_data($records)->set_total(OrdersHistoryHandler::total($settings))->json();
    }

    /**
     * Returns json of record.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function record_json(Request $request): JsonResponse
    {
        $settings = new ScaUsersApiRequestSettings();

        $settings->update($request->json()->all());

        $record = ScaUsersHandler::record_by_settings($settings);

        if ($record->is_empty())
        {
            return Response::get_instance()->set_message('Wrong data!')->set_status(HttpCodesClassifier::CONFLICT)->json();
        }

        $record->add_property('picture', ScaUsersHandler::picture($record->id_user));

        return Response::get_instance()->set_data($record)->json();
    }

    /**
     * Returns json of picture record.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function picture_json(Request $request): JsonResponse
    {
        $record = ScaUsersHandler::picture($request->json('id_user'));

        return response()->json(
            [
                'record' => $record,
            ]
        );
    }

    /**
     * Implements download an excel file.
     *
     * @param Request $request
     *
     * @return BinaryFileResponse
     */
    public function excel(Request $request): BinaryFileResponse
    {
        return Excel::download(new ScaUsersExport($request), DateManager::datetime() . '_users.xlsx');
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
    static public function records_json(Request $request): JsonResponse
    {
        $json = $request->json()->all();

        $settings = new ScaUsersApiRequestSettings();

        $settings->update($json);

        $response = ScaUsersHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'total' => ScaUsersHandler::total($settings),
            ]);
    }
}
