<?php

namespace App\ApiRequests\Authorization;

use App\Standards\ApiRequests\Abstracts\AttendanceApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestUrlsClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestMethodsClassifier;

/**
 * Implements request for get the access key.
 */
class AccessGetApiRequest extends AttendanceApiRequest
{
    protected HttpRequestMethodsClassifier $method = HttpRequestMethodsClassifier::post;

    /**
     * @param string $username
     *
     * @param string $password
     */
    public function __construct(string $username, string $password)
    {
        parent::__construct();

        $this->set_url(ApiRequestUrlsClassifier::ACCESS_GET->value);

        $this->set_basic_auth($username, $password);
    }
}
