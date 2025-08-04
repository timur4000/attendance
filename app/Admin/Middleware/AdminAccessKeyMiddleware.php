<?php

namespace App\Admin\Middleware;

use App\ApiRequests\Test\TestApiRequest;
use App\Handlers\Admin\Authorization\AuthorizationHandler;
use App\Standards\ApiRequests\Classifiers\ApiRequestNumberClassifier;
use App\Standards\Classifiers\Http\HttpHeadersClassifier;
use App\Standards\Classifiers\Http\HttpRequestedTypesClassifier;
use Closure;
use Illuminate\Http\Request;

/**
 * Checks and replaces the access key if it has expired.
 */
class AdminAccessKeyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!admin_authorization()->is_authorized())
        {
            return $next($request);
        }

//        if ($request->header(HttpHeadersClassifier::X_REQUESTED_WITH->name) === HttpRequestedTypesClassifier::XML_HTTP_REQUEST->value)
//        {
//            return $next($request);
//        }

        $test_api_request = new TestApiRequest();

        $test_api_request->execute();

        if ($test_api_request->get_response()->number === ApiRequestNumberClassifier::TOKEN_EXPIRED->value)
        {
            $new_access_key = AuthorizationHandler::refresh(admin_authorization()->get_refresh_key());

            if (!$new_access_key->is_empty())
            {
                admin_authorization()->update($new_access_key->first_package());
            }
        }

        return $next($request);
    }
}
