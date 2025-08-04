<?php

namespace App\Admin\Controllers\Presence\Absent;

use App\ApiRequestSettings\Data\Presence\Absent\ScaAbsentApiRequestSettings;
use App\Handlers\Admin\Presence\Absent\AbsentHandler;
use App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements absent actions.
 */
class ScaAbsentController
{
    /**
     * Displaying index page
     *
     * @return View
     */
    public static function index(): View
    {
        $breadcrumbs =
            [
                [ 'url' => RouteGroup::get_route(DashboardIndexGetRouteRequest::class), 'title' => 'Absent' ],
            ];

        return view(admin_directory('presence.absent.index'))
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

        $settings = new ScaAbsentApiRequestSettings();

        $settings->update($json);

        $response = AbsentHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'total' => AbsentHandler::total($settings),
                'json' => $json,
            ]);
    }
}
