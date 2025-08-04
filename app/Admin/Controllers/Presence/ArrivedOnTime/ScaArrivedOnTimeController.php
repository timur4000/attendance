<?php

namespace App\Admin\Controllers\Presence\ArrivedOnTime;

use App\ApiRequestSettings\Data\Presence\ArrivedOnTime\ScaArrivedOnTimeApiRequestSettings;
use App\Handlers\Admin\Presence\ArrivedOnTime\ArrivedOnTimeHandler;
use App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements arrived on time actions.
 */
class ScaArrivedOnTimeController
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
                [ 'url' => RouteGroup::get_route(DashboardIndexGetRouteRequest::class), 'title' => 'Arrived on time' ],
            ];

        return view(admin_directory('presence.arrived-on-time.index'))
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

        $settings = new ScaArrivedOnTimeApiRequestSettings();

        $settings->update($json);

        $response = ArrivedOnTimeHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'total' => ArrivedOnTimeHandler::total($settings),
                'json' => $json,
            ]);
    }
}
