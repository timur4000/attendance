<?php

namespace App\Admin\Controllers\Authorization;

use App\Admin\Controllers\BaseController;
use App\ApiRequests\Authorization\AccessLogoutApiRequest;
use App\RoutesRequests\Admin\Authorization\AuthorizationLoginGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Http\RedirectResponse;

/**
 * Implements logout action.
 */
class LogoutController extends BaseController
{
    /**
     * Implements logout.
     *
     * @return RedirectResponse
     */
    static public function handle(): RedirectResponse
    {
        if (admin_authorization()->is_authorized())
        {
            $request = new AccessLogoutApiRequest(admin_authorization()->user()->logout_key);

            $request->execute();

            admin_authorization()->logout();
        }

        return redirect()->route(RouteGroup::get_sequence(AuthorizationLoginGetRouteRequest::class));
    }
}
