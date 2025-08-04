<?php

namespace App\ApiRequests\Data;

use App\ApiRequestSettings\Data\Dashboard\Users\AttendancePersonnelByCategoryApiRequestSettings;
use App\Standards\Abstracts\ApiRequests\AttendanceApiRequest;
use App\Standards\Classifiers\ApiRequests\ApiRequestUrlsClassifier;

class AttendancePersonnelByCategoryApiRequest extends AttendanceApiRequest
{
    public function __construct(AttendancePersonnelByCategoryApiRequestSettings $settings)
    {
        parent::__construct();

        $this->set_url(ApiRequestUrlsClassifier::DATA->value);

        $this->set_token(admin_authorization()->user()->access_key);

        $this->set_body($settings->to_array());
    }
}
