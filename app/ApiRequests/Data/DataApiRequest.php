<?php

namespace App\ApiRequests\Data;

use App\Standards\ApiRequests\Abstracts\AttendanceApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestUrlsClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;

/**
 * Implements common settings of data requests.
 */
class DataApiRequest extends AttendanceApiRequest
{
    public function __construct(ApiRequestSettings $settings)
    {
        parent::__construct();

        $this->set_url(ApiRequestUrlsClassifier::DATA->value);

        $this->set_token(admin_authorization()->user()->access_key);

        $this->set_body($settings->to_array());
    }
}
