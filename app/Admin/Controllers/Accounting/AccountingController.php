<?php

namespace App\Admin\Controllers\Accounting;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Reports\FoodCard\ScaReportFoodCardApiRequestSettings;
use App\Exports\Accounting\AccountingExport;
use App\Handlers\Admin\Reports\FoodCard\ScaReportFoodCardHandler;
use App\Managers\Date\DateManager;
use App\RoutesRequests\Admin\Accounting\AccountingIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use ReflectionException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Implements accounting actions.
 */
class AccountingController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(AccountingIndexGetRouteRequest::class), 'Accounting');

        return view(admin_directory('admin.accounting.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Returns records of sca report food card.
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

        $settings = new ScaReportFoodCardApiRequestSettings();

        $settings->update($json);

        $response = ScaReportFoodCardHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'total' => ScaReportFoodCardHandler::total($settings),
                'json' => $json,
            ]);
    }

    /**
     * Returns totals of sca report food card.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    static public function totals(Request $request): JsonResponse
    {
        $json = $request->json()->all();

        $settings = new ScaReportFoodCardApiRequestSettings();

        $settings->update($json);

        return response()->json(
            [
                'data' => ScaReportFoodCardHandler::totals($settings),
                'json' => $json,
            ]);
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
        return Excel::download(new AccountingExport($request), DateManager::datetime() . '_users.xlsx');
    }
}
