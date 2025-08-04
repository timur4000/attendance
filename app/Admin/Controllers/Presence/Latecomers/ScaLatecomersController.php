<?php

namespace App\Admin\Controllers\Presence\Latecomers;

use App\ApiRequestSettings\Data\Presence\Latecomers\ScaLatecomersApiRequestSettings;
use App\Handlers\Admin\Presence\Latecomers\LatecomersHandler;
use App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements latecomers actions.
 */
class ScaLatecomersController
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
                [ 'url' => RouteGroup::get_route(DashboardIndexGetRouteRequest::class), 'title' => 'Latecomers' ],
            ];

        return view(admin_directory('presence.latecomers.index'))
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

        $settings = new ScaLatecomersApiRequestSettings();

        $settings->update($json);

        $response = LatecomersHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'total' => LatecomersHandler::total($settings),
                'json' => $json,
            ]);
    }
}
