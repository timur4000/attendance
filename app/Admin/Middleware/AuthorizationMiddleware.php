<?php

namespace App\Admin\Middleware;

use App\RoutesRequests\Admin\Authorization\AuthorizationLoginGetRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Closure;
use Illuminate\Http\Request;

/**
 * Implements an authorization session timeout expired.
 */
class AuthorizationMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!admin_authorization()->is_authorized())
        {
            return redirect()->route(RouteGroup::get_request_sequence(AuthorizationLoginGetRouteRequest::class));
        }

        return $next($request);
    }
}
