<?php

namespace App\Admin\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Implements redirect if user is authorized.
 */
class BeforeAuthorizationMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (admin_authorization()->is_authorized())
        {
            return redirect()->route(admin_home_route());
        }

        return $next($request);
    }
}
