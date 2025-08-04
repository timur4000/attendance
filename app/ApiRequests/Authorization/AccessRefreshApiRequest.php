<?php

namespace App\ApiRequests\Authorization;

use App\Standards\ApiRequests\Abstracts\AttendanceApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestUrlsClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestHeadersClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestMethodsClassifier;

/**
 * Implements request for refresh the access key.
 */
class AccessRefreshApiRequest extends AttendanceApiRequest
{
    protected HttpRequestMethodsClassifier $method = HttpRequestMethodsClassifier::post;

    public function __construct(string $refresh_token)
    {
        parent::__construct();

        $this->set_url(ApiRequestUrlsClassifier::ACCESS_REFRESH->value);

        $this->put_header(HttpRequestHeadersClassifier::ACCESS_REFRESH, $refresh_token);
    }
}
