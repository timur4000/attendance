<?php

namespace App\Admin\Middleware\Sessions;

use App\Standards\Classifiers\Cookies\CookiesNamesClassifier;
use App\Standards\Classifiers\Sessions\SessionNamesClassifier;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

/**
 * Implements setting advanced lifetime for a session if the is_remember input is exist.
 */
class AdvancedSessionTime
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->input(SessionNamesClassifier::is_remember->name))
        {
            Cookie::queue(CookiesNamesClassifier::is_remember->name, Str::random(64), 43200);
        }

        if (Cookie::has(CookiesNamesClassifier::is_remember->name))
        {
            Config::set('session.lifetime', 43200);
        }

        return $next($request);
    }
}
