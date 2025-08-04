<?php

namespace App\Admin\Controllers\Terminal;

use App\Admin\Controllers\BaseController;
use App\RoutesRequests\Admin\Terminal\TerminalIndexGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

/**
 * Implements terminal actions.
 */
class TerminalController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(TerminalIndexGetRouteRequest::class), 'Terminal');

        return view(admin_directory('admin.terminal.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Implements execution the given command.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function handle(Request $request): JsonResponse
    {
        try
        {
            Artisan::call($request->json('command'));

            $output = Artisan::output();
        }
        catch (\Exception $exception)
        {
            $output = $exception->getMessage();
        }

        return response()->json([ 'output' => $output ]);
    }
}
