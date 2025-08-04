<?php

namespace App\Admin\Middleware;

use App\Handlers\Admin\OperationLogs\OperationLogsHandler;
use App\RouteGroups\Admin\OperationLogs\OperationLogsRouteGroup;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Closure;

/**
 * Implements creates operation log actions in database.
 */
class OperationLogsMiddleware
{
    public function handle($request, Closure $next)
    {
        return $next($request); // Added by Timkin 2025-07-23 This string turns OFF LOGS //

        OperationLogsHandler::past_records_processing();

        if (RouteGroup::is_route(OperationLogsRouteGroup::class))
        {
            return $next($request);
        }

        $attributes =
            [
                'method' => $request->method(),
                'path' => $request->path(),
                'route' => $request->route()->getName(),
                'description' => null,
                'id_user' => admin_authorization()->user()->id_user,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'query' => $request->query(),
                'data' => array_merge($request->all(), $request->json()->all()),
            ];

        OperationLogsHandler::create($attributes);

        return $next($request);
    }
}
