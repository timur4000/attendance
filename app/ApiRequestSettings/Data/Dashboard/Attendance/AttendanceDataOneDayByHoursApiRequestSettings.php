<?php

namespace App\ApiRequestSettings\Data\Dashboard\Attendance;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;

/**
 * Contains all possible settings of the attendance users by one day api request.
 */
class AttendanceDataOneDayByHoursApiRequestSettings extends AttendanceDataApiRequestSettings
{
    public function __construct()
    {
        parent::__construct();

        $this->type_request = ApiRequestDataTypesClassifier::ATTENDANCE_DATA_ONE_DAY_BY_HOURS;
    }
}
