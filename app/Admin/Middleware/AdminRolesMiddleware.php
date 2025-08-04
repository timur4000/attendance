<?php

namespace App\Admin\Middleware;

use App\Standards\Classifiers\Http\HttpCodesClassifier;
use Closure;

/**
 * Implements accessing to routes by roles.
 */
class AdminRolesMiddleware
{
    /**
     * @param $request
     *
     * @param Closure $next
     *
     * @return void
     */
    public function handle($request, Closure $next)
    {
        if (!admin_authorization()->is_authorized() || admin_authorization()->has_role())
        {
            return $next($request);
        }

        abort(HttpCodesClassifier::FORBIDDEN->value);
    }
}
