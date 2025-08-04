<?php

namespace App\Admin\Controllers\Dashboards\Canteen;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Reports\Canteen\Days\ReportCanteenOneDayApiRequestSettings;
use App\ApiRequestSettings\Data\Reports\Canteen\Days\ReportCanteenTwoDaysApiRequestSettings;
use App\ApiRequestSettings\Data\Reports\Canteen\Months\ReportCanteenOneMonthApiRequestSettings;
use App\ApiRequestSettings\Data\Reports\Canteen\Months\ReportCanteenTwoMonthsSumApiRequestSettings;
use App\Handlers\Admin\Reports\Canteen\ReportCanteenHandler;
use App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Response\Classes\Response;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use ReflectionException;

/**
 * Implements canteen dashboard actions.
 */
class CanteenDashboardController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(DashboardIndexGetRouteRequest::class), 'Canteen dashboard');

        return view(admin_directory('admin.dashboards.canteen.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Returns summary record of the specified day.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public static function one_day(Request $request): JsonResponse
    {
        $settings = new ReportCanteenOneDayApiRequestSettings();

        $settings->update($request->json()->all());

        $response = ReportCanteenHandler::one_day($settings);

        if (!$response->is_success())
        {
            return Response::get_instance()->set_message($response->message)->set_status(HttpCodesClassifier::BAD_REQUEST)->json();
        }

        $record = ReportCanteenHandler::create_model_days($response->first_package(), false);

        return Response::get_instance()->set_record($record)->json();
    }

    /**
     * Returns summary record of the specified and last days.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public static function two_days(Request $request): JsonResponse
    {
        $settings = new ReportCanteenTwoDaysApiRequestSettings();

        $settings->update($request->json()->all());

        $response = ReportCanteenHandler::two_days($settings);

        if (!$response->is_success())
        {
            return Response::get_instance()->set_message($response->message)->set_status(HttpCodesClassifier::BAD_REQUEST)->json();
        }

        $records = ReportCanteenHandler::create_model_days($response->package);

        return Response::get_instance()->set_data($records)->json();
    }

    /**
     * Returns records of each day in month.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public static function one_month(Request $request): JsonResponse
    {
        $settings = new ReportCanteenOneMonthApiRequestSettings();

        $settings->update($request->json()->all());

        $response = ReportCanteenHandler::one_month($settings);

        if (!$response->is_success())
        {
            return Response::get_instance()->set_message($response->message)->set_status(HttpCodesClassifier::BAD_REQUEST)->json();
        }

        $records = ReportCanteenHandler::create_model_months($response->package);

        return Response::get_instance()->set_data($records)->json();
    }

    /**
     * Returns summary records of the specified and last months.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public static function two_months_sum(Request $request): JsonResponse
    {
        $settings = new ReportCanteenTwoMonthsSumApiRequestSettings();

        $settings->update($request->json()->all());

        $response = ReportCanteenHandler::two_months_sum($settings);

        if (!$response->is_success())
        {
            return Response::get_instance()->set_message($response->message)->set_status(HttpCodesClassifier::BAD_REQUEST)->json();
        }

        $records = ReportCanteenHandler::create_model_months($response->package);

        return Response::get_instance()->set_data($records)->json();
    }
}
