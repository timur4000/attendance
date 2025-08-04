<?php

namespace App\Admin\Middleware;

use App\Standards\Classifiers\Admin\AdminConfigClassifier;
use App\Standards\Classifiers\Admin\LocalizationVarClassifier;
use App\Managers\Admin\AdminConfigManager;
use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

/**
 * Implements set locale by value of session or sets default.
 */
class LocalizationMiddleware
{
    public function handle($request, Closure $next)
    {
        $locale = Session::get(LocalizationVarClassifier::locale->name) ?? AdminConfigManager::get_option(AdminConfigClassifier::locale);

        if ($locale)
        {
            App::setLocale($locale);
        }

        return $next($request);
    }
}
