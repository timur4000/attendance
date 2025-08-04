<?php

namespace App\ApiRequests\Authorization;

use App\Standards\ApiRequests\Abstracts\AttendanceApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestUrlsClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestHeadersClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestMethodsClassifier;

/**
 * Implements request for logout the access key.
 */
class AccessLogoutApiRequest extends AttendanceApiRequest
{
    protected HttpRequestMethodsClassifier $method = HttpRequestMethodsClassifier::post;

    public function __construct(string $logout_token)
    {
        parent::__construct();

        $this->set_url(ApiRequestUrlsClassifier::ACCESS_LOGOUT->value);

        $this->put_header(HttpRequestHeadersClassifier::ACCESS_LOGOUT, $logout_token);
    }
}
