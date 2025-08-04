<?php

namespace App\ApiRequests\Test;

use App\Standards\ApiRequests\Abstracts\AttendanceApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestUrlsClassifier;
use App\Standards\HttpRequests\Classifiers\HttpRequestMethodsClassifier;

/**
 * Implements test request.
 */
class TestApiRequest extends AttendanceApiRequest
{
    /**
     * @inheritdoc
     *
     * @var HttpRequestMethodsClassifier
     */
    protected HttpRequestMethodsClassifier $method = HttpRequestMethodsClassifier::post;

    public function __construct()
    {
        parent::__construct();

        $this->set_url(ApiRequestUrlsClassifier::TEST->value);

        $this->set_token(admin_authorization()->user()->access_key);
    }
}
