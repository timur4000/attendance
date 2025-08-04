<?php

namespace App\ApiRequests\Data\Dashboard\Attendance;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendanceDataOneDayByHoursApiRequestSettings;

/**
 * Implements request for the data of the attendance users by whole day.
 */
class AttendanceDataOneDayByHoursApiRequest extends DataApiRequest
{
    public function __construct(AttendanceDataOneDayByHoursApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
