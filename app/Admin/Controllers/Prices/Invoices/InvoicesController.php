<?php

namespace App\Admin\Controllers\Prices\Invoices;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Prices\Invoices\InvoicesApiRequestSettings;
use App\ApiRequestSettings\Data\Prices\Invoices\InvoiceUpdateApiRequestSettings;
use App\Handlers\Admin\Prices\Invoices\InvoicesHandler;
use App\RoutesRequests\Admin\Prices\Invoices\InvoicesIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements invoices actions.
 */
class InvoicesController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(InvoicesIndexGetRouteRequest::class), 'Invoices');

        return view(admin_directory('prices.invoices.index'))
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

        $settings = new InvoiceUpdateApiRequestSettings();

        $settings->update($post);

        $test = InvoicesHandler::update($settings);

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

        $settings = new InvoicesApiRequestSettings();

        $settings->update($json);

        $response = InvoicesHandler::records($settings);

        return response()->json(
            [
                'data' => $response,
                'json' => $json,
            ]);
    }
}
