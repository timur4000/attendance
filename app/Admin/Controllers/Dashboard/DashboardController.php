<?php

namespace App\Admin\Controllers\Dashboard;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendanceDataOneDayByHoursApiRequestSettings;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendanceDataOneHourApiRequestSettings;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendancePersonnelByCategoryApiRequestSettings;
use App\Handlers\Admin\Dashboard\Attendance\AttendanceHandler;
use App\Handlers\Admin\Dashboard\DashboardHandler;
use App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest;
use App\Standards\Callables\Handlers\Dashboard\Attendance\AttendanceHandlerUsersByHourEnterExitFilterCallable;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements dashboard actions.
 */
class DashboardController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(DashboardIndexGetRouteRequest::class), 'Dashboard');

        return view(admin_directory('admin.dashboard.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Returns json of the users by category.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function users_by_category(Request $request): JsonResponse
    {
        $json = $request->json()->all();

        $settings = new AttendancePersonnelByCategoryApiRequestSettings();

        $settings->update($json);

        $records = AttendanceHandler::first_users_by_categories($settings, $json['code_category'] ?? '');

        return response()->json($records);
    }

    /**
     * Returns array of the sca presence total.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function sca_presence_total(Request $request): JsonResponse
    {
        return response()->json(DashboardHandler::sca_presence_total($request));
    }

    /**
     * Returns json of the summary users by hours.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function summary_users_by_hours(Request $request): JsonResponse
    {
        $settings = new AttendanceDataOneDayByHoursApiRequestSettings();

        $settings->summary_data = 1;

        $settings->update($request->json()->all());

        $records = AttendanceHandler::attendance_users_by_day($settings);

        return response()->json($records->values());
    }

    /**
     * TODO: Needed refactoring for filter!
     *
     * Returns json of the users by hour.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function users_by_hour(Request $request): JsonResponse
    {
        $settings = new AttendanceDataOneHourApiRequestSettings();

        $settings->update($request->json()->all());

        $records = AttendanceHandler::attendance_users_by_hour($settings);

        if ($request->json('type') === 'line')
        {
            $records = $records->filter(new AttendanceHandlerUsersByHourEnterExitFilterCallable());
        }

        return response()->json(
            [
                'data' => $records->values(),
            ]
        );
    }
}
