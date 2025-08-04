<?php

namespace App\ApiRequestSettings\Data\Dashboard\Attendance;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the attendance users by one hour api request.
 */
class AttendanceDataOneHourApiRequestSettings extends AttendanceDataApiRequestSettings
{
    #[RequestKeyAttribute('Hour')]
    public int $hour = 0;

    public function __construct()
    {
        parent::__construct();

        $this->type_request = ApiRequestDataTypesClassifier::ATTENDANCE_DATA_ONE_HOUR;
    }
}
