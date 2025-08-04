<?php

namespace App\ApiRequestSettings\Data\ScaReportAttendanceOneUser;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible base settings of the sca report attendance one user requests.
 */
class ScaReportAttendanceOneUserApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('Date')]
    public string $date = '';

    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::SCA_REPORT_ATTENDANCE_ONE_USER;

        $this->date = date('Y-m-d');
    }
}
