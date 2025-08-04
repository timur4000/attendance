<?php

namespace App\Admin\Controllers\ServicesPayment\Tuition;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\ServicesPayment\Tuition\TuitionApiRequestSettings;
use App\Handlers\Admin\ServicesPayment\TuitionHandler;
use App\RoutesRequests\Admin\ServicesPayment\Tuition\TuitionIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements tuition actions.
 */
class TuitionController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(TuitionIndexGetRouteRequest::class), 'Tuition');

        return view(admin_directory('services-payment.tuition.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Displaying detail page.
     *
     * @return View
     */
    public function detail(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(TuitionIndexGetRouteRequest::class), 'Tuition');

        $this->add_breadcrumb(RouteGroup::get_route(TuitionIndexGetRouteRequest::class), 'Detail');

        return view(admin_directory('services-payment.tuition.detail'))
            ->with($this->get_breadcrumbs_to_with());
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

        $settings = new TuitionApiRequestSettings();

        $settings->update($json);

        $response = TuitionHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'total' => TuitionHandler::sum($settings),
                'json' => $json,
            ]);
    }
}
