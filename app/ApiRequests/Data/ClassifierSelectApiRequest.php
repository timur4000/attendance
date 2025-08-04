<?php

namespace App\ApiRequests\Data;

use App\ApiRequestSettings\Data\Classifiers\ClassifierSelectApiRequestSettings;
use App\Standards\Abstracts\ApiRequests\AttendanceApiRequest;
use App\Standards\Classifiers\ApiRequests\ApiRequestUrlsClassifier;

/**
 * Implements request for data of the classifiers api.
 */
class ClassifierSelectApiRequest extends AttendanceApiRequest
{
    public function __construct(ClassifierSelectApiRequestSettings $settings)
    {
        parent::__construct();

        $this->set_url(ApiRequestUrlsClassifier::DATA->value);

        $this->set_token(admin_authorization()->user()->access_key);

        $this->set_body($settings->to_array());
    }
}
