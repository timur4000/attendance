<?php

namespace App\Admin\Controllers\Users;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Users\UsersArrivalsDeparturesApiRequestSettings;
use App\ApiRequestSettings\Data\Users\UsersSelectApiRequestSettings;
use App\Exports\Users\UsersArrivalsDeparturesExport;
use App\Handlers\Admin\Users\UsersArrivalsDeparturesHandler;
use App\Handlers\Admin\Users\UsersHandler;
use App\Managers\Date\DateManager;
use App\RoutesRequests\Admin\Users\UsersIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use ReflectionException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Implements dashboard actions.
 */
class UsersController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    static public function index(): View
    {
        $breadcrumbs =
            [
                [ 'url' => RouteGroup::get_route(UsersIndexGetRouteRequest::class), 'title' => 'Users' ],
            ];

        return view(admin_directory('users.index'))
            ->with(compact([ 'breadcrumbs' ]));
    }

    /**
     * Returns list of records.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    static public function list_json(Request $request): JsonResponse
    {
        $json = $request->json()->all();

        $users_settings = new UsersSelectApiRequestSettings();

        $users_settings->update($json);

        $response = UsersHandler::records($users_settings);

        return response()->json(
            [
                'data' => $response,
                'total' => UsersHandler::total($users_settings),
                'json' => $json,
            ]);
    }

    /**
     * Returns records of arrivals and departures.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    static public function arrivals_departures(Request $request): JsonResponse
    {
        $json = $request->json()->all();

        $settings = new UsersArrivalsDeparturesApiRequestSettings();

        $settings->update($json);

        $response = UsersArrivalsDeparturesHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'total' => UsersArrivalsDeparturesHandler::total($settings),
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
    static public function arrivals_departures_excel(Request $request): BinaryFileResponse
    {
        return Excel::download(new UsersArrivalsDeparturesExport($request), DateManager::datetime() . '_users_arrivals_departures.xlsx');
    }
}
