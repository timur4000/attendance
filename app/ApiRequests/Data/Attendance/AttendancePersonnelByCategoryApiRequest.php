<?php

namespace App\ApiRequests\Data\Attendance;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Dashboard\Users\AttendancePersonnelByCategoryApiRequestSettings;

/**
 * Implements request for the data of the
 */
class AttendancePersonnelByCategoryApiRequest extends DataApiRequest
{
    public function __construct(AttendancePersonnelByCategoryApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
