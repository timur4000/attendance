<?php

namespace App\Admin\Controllers\Prices\Food;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Prices\Food\FoodApiRequestSettings;
use App\ApiRequestSettings\Data\Prices\Food\FoodUpdateApiRequestSettings;
use App\Handlers\Admin\Prices\Food\FoodHandler;
use App\RoutesRequests\Admin\Prices\Food\FoodIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements food actions.
 */
class FoodController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(FoodIndexGetRouteRequest::class), 'Food');

        return view(admin_directory('prices.food.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Implements record update and returned it.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $post = $request->post();

        $settings = new FoodUpdateApiRequestSettings();

        $settings->update($post);

        $test = FoodHandler::update($settings);

        return response()->json($test);
    }

    /**
     * Returns list of records.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function list_json(Request $request): JsonResponse
    {
        $json = $request->json()->all();

        $settings = new FoodApiRequestSettings();

        $settings->update($json);

        $response = FoodHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'json' => $json,
            ]);
    }
}
