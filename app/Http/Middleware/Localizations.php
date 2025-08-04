<?php

namespace App\Http\Middleware;

use App\Standards\Classifiers\Chars\CharsClassifiers;
use Closure;
use Illuminate\Support\Facades\App;

class Localizations
{
    public function handle($request, Closure $next)
    {
        $langPrefix = ltrim($request->segment(1), CharsClassifiers::URL_DELIMITER);

        if ($langPrefix)
        {
			App::setLocale($langPrefix);
        }

        return $next($request);
    }
}
